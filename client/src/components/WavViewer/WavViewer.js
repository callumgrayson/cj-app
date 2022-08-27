import { useState } from "react";
import Loader from "../Loader/Loader";
import ViewBufferArray from "./ViewBufferArray";
import getWavInfo from "./getWavInfo";
import getDisplayData from "./getDisplayData";

const acceptList = [".wav"];

const mimeTypes = {
  "audio/wav": "audio/wav",
};

const readerMethods = {
  readAsText: "readAsText",
  readAsArrayBuffer: "readAsArrayBuffer",
  readAsBinaryString: "readAsBinaryString",
  readAsDataURL: "readAsDataURL",
};

const outputTypes = {
  Int8Array: "Int8Array",
  Uint8Array: "Uint8Array",
  Int16Array: "Int16Array",
  Int32Array: "Int32Array",
};

const waveFormat = [
  "chunkId",
  "chunkSize",
  "format",
  "subChunk1Id",
  "subChunk1Size",
  "audioFormat_numChannels",
  "sampleRate",
  "byteRate",
  "blockAlign_bitsPerSample",
  "subChunk2Id",
  "subChunk2Size",
];

function parseFile(file, data, type) {
  //   console.log("parseFile()", file, data);
  //   console.log("data", data);

  if (!file || !data) return null;

  //   if (type === "binary") {
  //     let binString = "";
  //     for (let i = 0; i < 100; i++) {
  //       binString += data[i];
  //     }
  //     console.log("binString", binString);
  //   }

  if (file.type === mimeTypes["audio/wav"]) {
    // Parse as a WAVE file with appropriate

    const chunks = [];
    const letters = [];
    const base10 = [];
    const hex = [];

    for (let i = 0; i < 11; i++) {
      const chunk = [];
      const hexChunk = [];
      for (let j = i * 4; j < (i + 1) * 4; j++) {
        chunk.push(data[j]);
        hexChunk.push(data[j].toString(16));
      }
      chunks.push(chunk);
      letters.push(
        chunk.map((codePoint) => String.fromCodePoint(codePoint)).join("")
      );
      base10.push(
        parseInt(
          [...hexChunk]
            .map((dec) => dec.toString(16))
            .reverse()
            .join(""),
          16
        )
      );
      hex.push(hexChunk);
    }

    const dataSound = [];
    for (let i = 44; i < 1000; i += 4) {
      const lr = [];
      for (let j = i; j < i + 4; j++) {
        lr.push(data[j]);
      }

      const asBin = lr.map((val) => val.toString(2));
      const asHex = lr.map((val) => val.toString(16));
      dataSound.push([
        [lr[0], lr[1], lr[2], lr[3]],
        asBin,
        asHex,
        [`${asBin[1]}${asBin[0]}`, `${asBin[3]}${asBin[2]}`],
        [
          parseInt(`${asBin[0]}${asBin[1]}`, 2),
          parseInt(`${asBin[2]}${asBin[3]}`, 2),
        ],
      ]);
    }

    // console.log("chunks", chunks);
    // console.log("dataSound", dataSound);

    const merged = chunks.map((ch, idx) => {
      return {
        [waveFormat[idx]]: {
          list: ch,
          text: letters[idx],
          base10: base10[idx],
          hex: hex[idx],
        },
      };
    });

    // console.log("merged", merged);
    return merged;
  }
  return { parsedData: "parsed" };
}

function getTypedArray(arrayBuffer, type) {
  switch (type) {
    case outputTypes.Int8Array:
      return new Int8Array(arrayBuffer);
    case outputTypes.Uint8Array:
      return new Uint8Array(arrayBuffer);
    case outputTypes.Int16Array:
      return new Int16Array(arrayBuffer);
    case outputTypes.Int32Array:
      return new Int32Array(arrayBuffer);
    default:
      return arrayBuffer;
  }
}

function readFile(fileInBinary, readerMethod, outputType) {
  return new Promise((resolve, reject) => {
    try {
      // extract file metadata
      // extract file data
      const reader = new FileReader();

      // Set the onload function
      reader.onload = (e) => {
        // console.log("e", e);
        console.log("reader.onload: e", e);
        const result = e.target.result;

        let output = null;

        switch (readerMethod) {
          case readerMethods.readAsArrayBuffer:
            output = outputType ? getTypedArray(result, outputType) : result;
            break;
          case readerMethods.readAsBinaryString:
            output = result;
            break;
          case readerMethods.readAsDataURL:
            output = result;
            break;
          case readerMethods.readAsText:
            output = result;
            break;
          default:
            output = result;
            break;
        }

        // const wavInfo = getWavInfo(result);
        // console.log("wavInfo", wavInfo);

        resolve(output);
      };

      // Run the reader
      reader[readerMethod](fileInBinary);
    } catch (error) {
      reject(error);
    }
  });
}

function WavViewer() {
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const [metadata, setMetadata] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [readData, setReadData] = useState(null);

  // Get All four kinds of read data
  // Store each in state
  // Display each kind

  async function handleFileUpload(e) {
    setLoading(true);
    const file = e.target.files[0];

    if (!file) return;

    setMetadata({
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // console.log("file", file);
    // const fileNameArray = file.name.split(".");
    // const extension = fileNameArray[fileNameArray.length - 1];

    let startTime = Date.now();

    const data = await readFile(
      file,
      readerMethods.readAsArrayBuffer,
      outputTypes.Uint8Array
    );
    // const binaryData = await readFile(file, readerMethods.readAsArrayBuffer);
    const asArrayBuffer = await readFile(file, readerMethods.readAsArrayBuffer);
    const asBinaryString = await readFile(
      file,
      readerMethods.readAsBinaryString
    );
    const asDataUrl = await readFile(file, readerMethods.readAsDataURL);
    const asText = await readFile(file, readerMethods.readAsText);

    // console.log("asArrayBuffer", asArrayBuffer);
    // console.log("asBinaryString", asBinaryString);
    // console.log("asDataUrl", asDataUrl);
    // console.log("asText", asText);

    setReadData({
      asArrayBuffer,
      asBinaryString,
      asDataUrl,
      asText,
    });

    const wavInfo = getWavInfo(asArrayBuffer);
    console.log("wavInfo", wavInfo);

    // console.log("binaryData", binaryData);

    setFileData(data);
    let endTime = Date.now();
    let diff = endTime - startTime;
    setLoadTime(diff / 1000);
    setLoading(false);

    const parsed = parseFile(file, data);
    setParsed(parsed);

    // const parsedBinary = parseFile(file, binaryData, "binary");
  }

  const displayData = getDisplayData(readData);

  //   const newParsed = parseFile(metadata, fileData);
  //   console.log("newParsed", newParsed);

  return (
    <div>
      <Loader loading={loading} message={"Loading..."}>
        <div className="flex-row justify-center align-center">
          <input
            type="file"
            accept={acceptList.join(",")}
            onChange={handleFileUpload}
          />
          <div>{loadTime > 0 ? `(in ${loadTime} seconds)` : null}</div>
        </div>
      </Loader>
      <div>File metadata: {JSON.stringify(metadata)}</div>
      <div>File format: {JSON.stringify(parsed, null, 2)}</div>
      {displayData}
      {/* <ViewBufferArray bufferArray={fileData} />
      <div
        style={{
          wordBreak: "break-word",
          width: "100%",
          overflowWrap: "break-word",
        }}
      >
        <div style={{ textAlign: "start" }}>
          {fileData && Array.isArray(fileData)
            ? fileData.map((i) => <div>{`${i}`}</div>)
            : null}
        </div>
      </div> */}
    </div>
  );
}

export default WavViewer;
