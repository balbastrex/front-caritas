export const orderLineCompareDescription = (a, b) => {
  if (a.description > b.description) return 1;
  if (a.description < b.description) return -1;
  return 0;
}

export const orderLineCompareName = (a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}
