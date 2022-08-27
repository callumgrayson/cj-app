import React from "react";

function pad(str, n) {
  const sign = str.indexOf("-") === -1 ? 1 : -1;
  let abs = str.replace("-", "");
  while (abs.length < n) {
    abs = "0" + abs;
  }
  return sign < 0 ? `-${abs}` : abs;
}
function pad2(str) {
  return pad(str, 2);
}
function pad4(str) {
  return pad(str, 4);
}
function pad8(str) {
  return pad(str, 8);
}
function pad16(str) {
  return pad(str, 16);
}

const pads = {
  8: pad8,
  16: pad16,
};

function get2sComplement(binaryString, padLength) {
  const binaryNumber = parseInt(binaryString, 2);
  const sign = Math.sign(binaryNumber);
  let parsed = parseInt(binaryString, 2);
  let comp = ~parsed + 1;

  if (sign < 0) {
    const max = Math.pow(2, padLength);
    const maxPlusValue = max + binaryNumber;
    comp = maxPlusValue;
    // console.log("sign, binaryString", sign, binaryString);
    // console.log("binaryNumber", binaryNumber);
    // console.log("max", max);
    // console.log("maxPlusValue", maxPlusValue);
    // console.log("parsed", parsed);
    // console.log("comp", comp);
  }
  const out = pads[padLength](Math.abs(comp).toString(2));
  return out;
}

function getDisplayData(readData) {
  //   console.log("readData", readData);
  if (!readData) return null;

  const displayPreviews = Object.keys(readData).map((dataKey, idx) => {
    const value = readData[dataKey];

    if (value instanceof ArrayBuffer) {
      const int8 = new Int8Array(value);
      const int16 = new Int16Array(value);
      const uInt8 = new Uint8Array(value);
      const uInt16 = new Uint16Array(value);
      const uInt16_sub = uInt16.subarray(0, 50);

      const subArrayBinary = Array.from(uInt16_sub).map((u16, idx) => {
        const b8_0 = pad8(int8[idx * 2].toString(2));
        const b8_1 = pad8(int8[idx * 2 + 1].toString(2));
        const b8U_0 = pad8(uInt8[idx * 2].toString(2));
        const b8U_1 = pad8(uInt8[idx * 2 + 1].toString(2));
        const b16 = pad16(int16[idx].toString(2));
        const b16U = pad16(uInt16[idx].toString(2));
        const h8_0 = `0x${pad2(int8[idx * 2].toString(16))}`;
        const h8_1 = `0x${pad2(int8[idx * 2 + 1].toString(16))}`;
        const h16 = `${pad4(int16[idx].toString(16))}`;
        const d8_0 = int8[idx * 2].toString(10);
        const d8_1 = int8[idx * 2 + 1].toString(10);
        const d8U_0 = uInt8[idx * 2].toString(10);
        const d8U_1 = uInt8[idx * 2 + 1].toString(10);
        const d16 = int16[idx].toString(10);
        const d16U = u16;
        return {
          d16: [d16],
          d16U: [d16U],
          d8: [d8_0, d8_1],
          d8U: [d8U_0, d8U_1],
          b16: [b16],
          b16U: [b16U],
          b8: [b8_0, b8_1],
          b8U: [b8U_0, b8U_1],
          h16: [h16],
          h8: [h8_0, h8_1],
        };
      });
      //   console.log("subArrayBinary", subArrayBinary);
      return { title: dataKey, data: subArrayBinary };
    }
    if (typeof value === "string") {
      const firstEl = value.substring(0, 100);
      //   console.log("firstEl", firstEl);
      return { title: dataKey, data: firstEl };
    }

    return "No info yet...";
  });

  return (
    <div>
      <hr />
      {displayPreviews.map((item, idx1) =>
        idx1 === 0 ? (
          <div key={idx1}>
            {JSON.stringify(item.data[0])}
            <table style={{ borderColor: "red" }}>
              <thead>
                <tr key="thead">
                  <th>#</th>
                  <th>d16</th>
                  <th>d16U</th>
                  <th>d8</th>
                  <th>d8U</th>
                  <th>bin</th>
                  <th>h16</th>
                  <th>h8</th>
                </tr>
              </thead>
              <tbody>
                {new Array(10).fill("").map((row, idx2) => {
                  const rowData = item.data[idx2];
                  return (
                    <tr>
                      <td>{idx2}</td>
                      <td>{rowData.d16}</td>
                      <td>{rowData.d16U}</td>
                      <td>[{rowData.d8.join(", ")}]</td>
                      <td>[{rowData.d8U.join(", ")}]</td>
                      <td
                        style={{
                          fontFamily: "Courier",
                          textAlign: "end",
                          display: "flex",

                          justifyContent: "center",
                        }}
                      >
                        <table>
                          <thead>
                            <tr key="partHead">
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody
                          // style={{
                          //   display: "flex",
                          //   flexDirection: "column",
                          //   alignItems: "flex-end",
                          //   border: "1px solid tan",
                          // }}
                          >
                            <tr key="b16">
                              <th>b16</th>
                              <td>{rowData.b16}</td>
                            </tr>
                            <tr key="b16U">
                              <th>b16U</th>
                              <td>{rowData.b16U}</td>
                            </tr>
                            <tr key="calcb16">
                              <th>calcb16</th>
                              <td>{get2sComplement(rowData.b16[0], 16)}</td>
                            </tr>
                            <tr key="b8">
                              <th>b8</th>
                              <td>
                                [{rowData.b8[1]},{rowData.b8[0]}]
                              </td>
                            </tr>
                            <tr key="b8U">
                              <th>b8U</th>
                              <td>
                                [{rowData.b8U[1]},{rowData.b8U[0]}]
                              </td>
                            </tr>
                            <tr key="calc8">
                              <th>calc8</th>
                              <td>
                                [{get2sComplement(rowData.b8[1], 8)},
                                {rowData.b8[0]}]
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>{rowData.h16}</td>
                      <td>{rowData.h8}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {item && item.data
            ? item.data.map((val, idx2) => {
                return <div>{val.d16[idx2]}</div>;
              })
            : null} */}
          </div>
        ) : null
      )}
    </div>
  );
}

export default getDisplayData;
