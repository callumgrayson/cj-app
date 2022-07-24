import { useState } from "react";
// import GraphBitwise from "./GraphBitwise";
import SVGGraphColumns from "../SVGGraph/SVGGraphColumns";

const options = {
  not: {
    display: "~",
    fn: (a) => ~a,
    leftSide: (a, b, c) => `${b}${a}`,
  },
  and: {
    display: "&",
    fn: (a, b) => a & b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  or: {
    display: "|",
    fn: (a, b) => a | b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  xor: {
    display: "^",
    fn: (a, b) => a ^ b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftLeft: {
    display: "<<",
    fn: (a, b) => a << b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftRight: {
    display: ">>",
    fn: (a, b) => a >> b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftRightUnsigned: {
    display: ">>>",
    fn: (a, b) => a >>> b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
};

function Bitwise() {
  const [nBasis, setNumber] = useState(3);
  const nBasis_number = Number(nBasis);

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  const domain = 36;
  const numbersIterable = new Array(domain).fill().map((_, idx) => {
    return idx - domain / 2;
  });

  return (
    <div className="bitwise">
      <input type="text" onChange={handleNumberChange} value={nBasis} />
      <div className="flex-row justify-around">
        {Object.keys(options).map((optKey, idxOpt) => {
          const optVal = options[optKey];
          const dataList = numbersIterable.map((a) => {
            return optVal.fn(a, nBasis_number);
          });
          return (
            <div key={optKey} className="width-100">
              <div>
                {numbersIterable.map((startN, idx) => {
                  return (
                    <div key={startN}>
                      {optVal.leftSide(startN, optVal.display, nBasis_number)} ={" "}
                      {optVal.fn(startN, nBasis_number)}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "relative",
                  // border: "1px solid gold",
                  marginTop: "10px",
                }}
              >
                <SVGGraphColumns dataList={dataList} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bitwise;
