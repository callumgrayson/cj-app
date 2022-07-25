import React from "react";
import "./SVGGraph.css";

function SVGGraph({
  width,
  height,
  range,
  domain,
  points,
  showXAxis = true,
  showYAxis = true,
  scaleX,
  scaleY,
  className = "",
}) {
  return (
    <svg
      height={height}
      width={width}
      viewBox={`${domain[0]} ${range[0]} ${width} ${height}`}
      className={`svg-graph-container ${className}`}
      preserveAspectRatio="none"
    >
      <g stroke="red" fill="none" strokeWidth={`${scaleX / 2}px`}>
        <path d={points} />
      </g>
      {showXAxis ? (
        <g stroke="black" fill="none" strokeWidth={`${scaleY}px`}>
          <path d={`M${domain[0]},0 L${domain[1]},0`} />
        </g>
      ) : null}
      {showYAxis ? (
        <g stroke="black" fill="none" strokeWidth={`${scaleY}px`}>
          <path d={`M0,${range[0]} L0,${range[1]}`} />
        </g>
      ) : null}
    </svg>
  );
}

export default SVGGraph;
