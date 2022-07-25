import { useState } from "react";
import SVGGraphColumns from "../SVGGraph/SVGGraphColumns";
import "./Bitwise.css";

const options = {
  not: {
    title: "NOT",
    display: "~",
    fn: (a) => ~a,
    leftSide: (a, b, c) => `${b}${a}`,
  },
  and: {
    title: "AND",
    display: "&",
    fn: (a, b) => a & b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  or: {
    title: "OR",
    display: "|",
    fn: (a, b) => a | b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  xor: {
    title: "XOR",
    display: "^",
    fn: (a, b) => a ^ b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftLeft: {
    title: "Left Shift",
    display: "<<",
    fn: (a, b) => a << b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftRight: {
    title: "Right Shift",
    display: ">>",
    fn: (a, b) => a >> b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
  shiftRightUnsigned: {
    title: "Unsigned Right Shift",
    display: ">>>",
    fn: (a, b) => a >>> b,
    leftSide: (a, b, c) => `${a} ${b} ${c}`,
  },
};

function getNumber(n) {
  return Number(n ? n : 0);
}

function Bitwise() {
  const [nBasis, setNBasis] = useState("-3");
  const [nBasisNumber, setnBasisNumber] = useState(getNumber(nBasis));
  const nBasis_number = nBasisNumber;

  function handleNumberChange(e) {
    setNBasis(e.target.value);
    if (e.target.value === "" || isNaN(Number(e.target.value))) {
      return;
    }
    setnBasisNumber(getNumber(e.target.value));
  }

  function incDec(e) {
    const value = e.target.value;
    const newN = Number(nBasis) + Number(value);
    setNBasis((Number(nBasis) + Number(value)).toString());
    setnBasisNumber(getNumber(newN));
  }

  const domain = 28;
  const numbersIterable = new Array(domain).fill().map((_, idx) => {
    return idx - domain / 2;
  });

  return (
    <div className="bitwise">
      <input type="text" onChange={handleNumberChange} value={nBasis} />
      <button onClick={incDec} value="-1">
        -
      </button>
      <button onClick={incDec} value="1">
        +
      </button>
      <div className="width-100 flex-row justify-center  ">
        <div className="flex-row bitwise-columns-box overflow-x-auto">
          {Object.keys(options).map((optKey, idxOpt) => {
            const optVal = options[optKey];
            const dataList = numbersIterable.map((a) => {
              return optVal.fn(a, nBasis_number);
            });
            return (
              <div key={optKey} className="min-width-fit">
                <h4>{optVal.title}</h4>
                <div>
                  {numbersIterable.map((startN, idx) => {
                    return (
                      <div key={startN}>
                        {optVal.leftSide(startN, optVal.display, nBasis_number)}{" "}
                        = {optVal.fn(startN, nBasis_number)}
                      </div>
                    );
                  })}
                </div>
                <div className="bitwise-graph-box">
                  <SVGGraphColumns
                    dataList={dataList}
                    showXAxis={true}
                    showYAxis={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Bitwise;
