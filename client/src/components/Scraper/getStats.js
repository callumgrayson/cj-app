export default function getStats(inData) {
  try {
    const list = inData.data.data;

    const uniqueAircraft = getUniques(list, 1);
    return {
      totalCount: list.length,
      uniqueAircraft,
    };
  } catch (error) {
    return {};
  }
}

function getUniques(dataArray, column) {
  const uniques = {};
  const totalCount = dataArray.length;

  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i][column];

    if (item in uniques) {
      uniques[item] = uniques[item] + 1;
    } else {
      uniques[item] = 1;
    }
  }

  return Object.entries(uniques)
    .map(([key, val]) => ({
      title: key,
      count: val,
      proportion: Math.round((val / totalCount) * 10000) / 100,
    }))
    .sort((a, b) => b.count - a.count);
}
