function isQueryError(result) {
  return typeof result === "string" && result.toLowerCase().includes("error");
}

function handleQuery(result) {
  if (isQueryError(result)) {
    throw new Error(result);
  }

  return result;
}

module.exports = {
  handleQuery,
  isQueryError,
};
