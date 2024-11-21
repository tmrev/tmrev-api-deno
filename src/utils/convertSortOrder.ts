const convertSortOrder = (order: "asc" | "desc" | string) => {
  if (order === "asc") return 1;
  if (order === "desc") return -1;

  return -1;
};

export default convertSortOrder;
