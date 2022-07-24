import React from "react";
import SVGGraph from "../SVGGraph/SVGGraph";

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

function createPoints({ yValues, scaleX, scaleY }) {
  // console.log("yValues", yValues);
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

function SVGExperiment1({ inData = createMockData({ domainCount: 36 }) }) {
  // console.log("inData", inData);
  const dataDomain = getDataDomain(inData);
  // const dataDomain = [0, 36];
  const dataRange = getDataRange(inData);
  const scaleX = 3;
  const scaleY = 2;
  const domain = [dataDomain[0] * scaleX, dataDomain[1] * scaleX];
  const range = [dataRange[0] * scaleY, dataRange[1] * scaleY];
  const width = Math.abs(domain[0] - domain[1]);
  const height = Math.abs(range[0] - range[1]);
  const showXAxis = false;
  return (
    // <div className="svg-graph-wrapper">
    <SVGGraph
      width={width}
      height={height}
      range={range}
      domain={domain}
      points={createPoints({ yValues: inData, scaleX, scaleY })}
      scaleX={scaleX}
      scaleY={scaleY}
      showXAxis={showXAxis}
    />
    // </div>
  );
}

export default SVGExperiment1;
