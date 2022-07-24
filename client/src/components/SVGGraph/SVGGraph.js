import React from "react";
import "./SVGGraph.css";

function SVGGraph({
  width,
  height,
  range,
  domain,
  points,
  scaleX,
  // scaleY,
  showXAxis,
  // showYAxis,
  // displayWidth,
  displayHeight,
}) {
  return (
    <svg
      height={displayHeight}
      width={width}
      viewBox={`${domain[0]} ${range[0]} ${width} ${height}`}
      className="svg-graph-container"
      preserveAspectRatio="none"
    >
      <g stroke="red" fill="none" strokeWidth={`${scaleX}`}>
        <path d={points} />
      </g>
      {showXAxis ? (
        <g stroke="lightgray" fill="none" strokeWidth="0.1px">
          <path d={`M${domain[0]},0 L${domain[1]},0`} />
        </g>
      ) : null}
    </svg>
  );
}

export default SVGGraph;
