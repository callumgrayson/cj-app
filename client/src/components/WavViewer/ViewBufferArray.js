import React from "react";

function ViewBufferArray({ bufferArray }) {
  const proceed = Boolean(bufferArray);
  if (!proceed) return null;

  //   console.log("Boolean(bufferArray)", proceed);
  const first = new Array(500).fill("").map((s, idx) => {
    // console.log("bufferArray[idx]", bufferArray[idx]);
    if (idx > 5) {
      //   console.log("typeof bufferArray[idx]", typeof bufferArray[idx]);
    }
    return bufferArray[idx];
  });
  const typeFirst = typeof first;
  const isArray = Array.isArray(first);
  const isInstanceBufferFirst = first instanceof ArrayBuffer;
  const isInstanceBufferBufferArray = bufferArray instanceof ArrayBuffer;

  return (
    <div>
      <div>{typeFirst}</div>
      <div>isArray {`${isArray}`}</div>
      <div>first isInstanceBufferFirst {isInstanceBufferFirst.toString()}</div>
      <div>
        first isInstanceBufferBufferArray{" "}
        {isInstanceBufferBufferArray.toString()}
      </div>

      {first.map((item, idx) => (
        <div key={idx}>
          {idx} - {item}
        </div>
      ))}
    </div>
  );
}

export default ViewBufferArray;
