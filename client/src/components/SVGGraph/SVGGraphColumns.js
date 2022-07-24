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

function getDataDomain(data) {
  return [0, data.length];
}

function getDataRange(data) {
  return [Math.min(...data), Math.max(...data)];
}

function createMockData({ domainCount }) {
  const points = [];
  for (let i = 0; i < domainCount; i++) {
    points.push((i - 18) >> 2);
  }
  return points;
}

function getSensibleData(dataList) {
  const min = Math.min(...dataList);
  const max = Math.max(...dataList);

  let transformed = [...dataList];
  if (Math.abs(min - max) > 400) {
    transformed = dataList.map((value) => {
      return getSignedLog(value);
    });
  }
  return transformed;
}

function createPoints({ yValues, scaleX, scaleY }) {
  const points = [];

  const scaleXShift = scaleX / 2;

  for (let i = 0; i < yValues.length; i++) {
    const i1 = i;
    points.push(
      `M${i1 * scaleX + scaleXShift},${0} L${i1 * scaleX + scaleXShift},${
        yValues[i] * scaleY
      }`
    );
  }

  return points.join(" ");
}

function SVGGraphColumns(
  { dataList = createMockData({ domainCount: 36 }) },
  showXAxis = true,
  showYAxis = true
) {
  const dataListSensible = getSensibleData(dataList);
  const dataDomain = getDataDomain(dataListSensible);
  const dataRange = getDataRange(dataListSensible);
  const scaleX = 3;
  const scaleY = 2;
  const domain = [dataDomain[0] * scaleX, dataDomain[1] * scaleX];
  const range = [dataRange[0] * scaleY, dataRange[1] * scaleY];
  const width = Math.abs(domain[0] - domain[1]);
  const height = Math.abs(range[0] - range[1]);

  return (
    <SVGGraph
      displayWidth="100%"
      displayHeight="100%"
      width={width}
      height={height}
      range={range}
      domain={domain}
      points={createPoints({ yValues: dataListSensible, scaleX, scaleY })}
      scaleX={scaleX}
      scaleY={scaleY}
      showXAxis={showXAxis}
      showYAxis={showYAxis}
    />
  );
}

export default SVGGraphColumns;
