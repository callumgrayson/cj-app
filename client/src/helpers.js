export function clamp(min, num, max) {
  return Math.min(Math.max(min, num), max);
}

export function getPreviewData(dataString, count, separator) {
  let previewData = [];
  let idx = 0;

  for (let i = 0; i <= count; i++) {
    const nextIdx = dataString.substring(idx).search(/\n/);
    const rowString = dataString.substring(idx, idx + nextIdx);

    previewData.push(rowString);

    idx = idx + nextIdx + 1;
  }
  return previewData.map((row) => row.split(separator));
}

export function getPreviewArray(array, startIndex, previewRowsCount) {
  let previewRows = [];
  for (let i = 0; i < previewRowsCount; i++) {
    previewRows.push(array[startIndex + i]);
  }
  return previewRows;
}
