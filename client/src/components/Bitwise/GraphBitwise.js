import React from "react";
import "./Bitwise.css";

function buildLine(startXY, endXY) {
  return;
}

function GraphBitwise({ dataList }) {
  return (
    <>
      <div className="graph-bitwise overflow-hidden">
        <div className="flex-row">
          {dataList.map((n, idx) => {
            return (
              <div
                key={idx}
                style={{
                  width: "1px",
                  height: `${36 / 2 - n}px`,
                  backgroundColor: "red",
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="">
        <svg viewBox="0 0 36 36" style={{ border: "1px solid red" }}>
          <g stroke="#dfdfdf" fill="none" strokeWidth="0.5px">
            <path
              d={
                "M10,0 L10,100 M20,0 L20,100 M30,0 L30,100 M40,0 L40,100 M50,0 L50,100 M60,0 L60,100 M70,0 L70,100 M80,0 L80,100 M90,0 L90,100"
              }
            />
            <path
              d={
                "M0,10 L100,10 M0,20 L100,20 M0,30 L100,30 M0,40 L100,40 M0,50 L100,50 M0,60 L100,60 M0,70 L100,70 M0,80 L100,80 M0,90 L100,90"
              }
            />
          </g>
          {/* <g stroke="black" fill="none" strokeWidth="0.4px">
            <path d={points} />
          </g> */}
        </svg>
      </div>
    </>
  );
}

export default GraphBitwise;
