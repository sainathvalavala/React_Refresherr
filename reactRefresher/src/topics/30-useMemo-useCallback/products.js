// 3,000 fake products, generated once when the file loads.
export const products = Array.from({ length: 3000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: ((i * 37) % 900) + 100,
}));

// A deliberately SLOW filter: the inner loop wastes time on every item to
// simulate an expensive calculation (big sorts, charts, parsing...).
export function slowFilter(items, query) {
  console.log(`slowFilter ran for "${query}"`);
  return items.filter((item) => {
    let wasted = 0;
    for (let i = 0; i < 30000; i++) wasted += i;
    return wasted > 0 && item.name.toLowerCase().includes(query.toLowerCase());
  });
}
