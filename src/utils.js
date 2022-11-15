export const getXAxis = duration => {
  const xAxis = [];
  for (let i = 0; i <= duration; i++) {
    xAxis.push(i);
  }

  return xAxis;
};
