export function sortProducts(products, sort) {
  const sorted = [...products];

  if (sort === "price-asc") {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}