function order(query, obj) {
  if (query === "year") {
    return obj.sort((a, b) => b.year - a.year);
  }
}

module.exports = {
  order: order,
};
