import React from "react";
import SVGGraph from "./SVGGraph";

function getSignedLog(value) {
  if (value === 0) return value;
  if (value > 0 && value < 2) return 1;

  const sign = Math.sign(value);
  const order = Math.round(Math.log2(Math.abs(value)));

  if (order === 0) return 0;

  return sign * order;
}

function squishData(dataList) {
  return dataList.map((value) => {
    const signedVal = getSignedLog(value);
    return signedVal;
  });
}

function getWidth(domain) {
  const abs = Math.abs(domain[0] - domain[1]);
  return abs < 3 ? 3 : abs;
}
function getHeight(range) {
  const minToZero = Math.abs(range[0]) + 1;
  const maxToZero = Math.abs(range[1]) + 1;
  const abs = Math.abs(range[0] - range[1]);
  const maxSpread = Math.max(minToZero, maxToZero, abs);
  return abs === 0 ? 100 : maxSpread;
}

function getScaleY(range, target) {
  const spread = range[1] - range[0];
  const scaleY = Math.round((target * 10) / spread) / 10;
  return isNaN(scaleY) || !isFinite(scaleY) ? 1 : scaleY;
}
function getScaleX(domain, target) {
  const divisor = domain[1] - domain[0];
  const scaleX = divisor === 0 ? 1 : Math.round(target / divisor);
  return isNaN(scaleX) || !isFinite(scaleX) ? 1 : scaleX;
}

function getDataDomain(data) {
  return [0, data.length];
}

function getDataRange(data) {
  return [Math.min(...data), Math.max(...data)];
}

function getLinearity(data) {
  const diffs = [];
  const uniques = {};
  data.forEach((val, idx) => {
    const nextVal = data[idx + 1];
    if (nextVal) {
      const diff = Math.abs(val - nextVal);
      diffs.push(diff);
      uniques[diff] = uniques[diff] ? uniques[diff] + 1 : 1;
    }
  });
  const countUniques = Object.keys(uniques).length;
  return countUniques <= 3 ? true : false;
}

function createMockData({ domainCount }) {
  const points = [];
  for (let i = 0; i < domainCount; i++) {
    points.push((i - 18) >> 2);
  }
  return points;
}

function getSensibleData(dataList, targetRange) {
  const min = Math.min(...dataList);
  const max = Math.max(...dataList);
  const range1 = Math.abs(min - max);
  const isDataLinear = getLinearity(dataList);
  const squishedData =
    range1 > 1000
      ? !isDataLinear
        ? squishData(dataList)
        : dataList
      : dataList;

  const min2 = Math.min(...squishedData);
  const max2 = Math.max(...squishedData);
  const range2 = Math.abs(min2 - max2);
  const scaleDecimal2 = range2 === 0 ? 1 : targetRange / range2;

  let transformed = squishedData.map((value) => {
    return range2 === 0
      ? value * targetRange
      : Math.round(value * scaleDecimal2 * 10) / 10;
  });

  return transformed;
}

function createPoints({ yValues, scaleX, scaleY }) {
  const points = [];

  const scaleXShift = scaleX / 2;

  for (let i = 0; i < yValues.length; i++) {
    points.push(
      `M${i * scaleX + scaleXShift},${0} L${i * scaleX + scaleXShift},${
        yValues[i] * scaleY
      }`
    );
  }

  return points.join(" ");
}

function SVGGraphColumns({
  dataList = createMockData({ domainCount: 36 }),
  showXAxis,
  showYAxis,
}) {
  const targetDomain = 100;
  const targetRange = 100;
  const dataListSensible = getSensibleData(dataList, targetRange);
  const dataDomain = getDataDomain(dataListSensible);
  const dataRange = getDataRange(dataListSensible);
  const scaleX = getScaleX(dataDomain, targetDomain);
  const scaleY = getScaleY(dataRange, targetRange);
  const domain = [dataDomain[0] * scaleX, dataDomain[1] * scaleX];
  const range = [dataRange[0] * scaleY, dataRange[1] * scaleY];
  const width = getWidth(domain);
  const height = getHeight(range);

  return (
    <SVGGraph
      width={width}
      height={height}
      displayWidth="100%"
      displayHeight="100%"
      range={range}
      domain={domain}
      scaleX={scaleX}
      scaleY={scaleY}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
      points={createPoints({ yValues: dataListSensible, scaleX, scaleY })}
    />
  );
}

export default SVGGraphColumns;
