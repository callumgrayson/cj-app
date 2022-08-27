export default function getWavInfo(arrayBuffer) {
  const format = new Uint8Array(arrayBuffer, 0, 44);
  const data = new Int16Array(arrayBuffer, 44);
  const dataPreview = getItems(data, 0, 1000);
  const formatText = Array.from(format).map((point) =>
    String.fromCodePoint(point)
  );

  // console.log("format", format);
  // console.log("dataPreview", dataPreview);
  return {
    format: format,
    formatText: formatText,
    data: data,
    dataPreview: dataPreview,
  };
}

function getItems(data, start, end) {
  return data.subarray(start, end);
}
