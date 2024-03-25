export const transformQueryResult = (res) => {
  const transformedData = res.values.map(row => {
    const obj = {};
    res.columns.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });

  return transformedData;
};
