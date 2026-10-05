const products = [
  { id: "1", name: "Mechanical keyboard", price: 4500 },
  { id: "2", name: "Wireless mouse", price: 1200 },
  { id: "3", name: "27-inch monitor", price: 18000 },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts() {
  await wait(600);
  return products;
}

export async function getProduct(id) {
  await wait(600);
  return products.find((p) => p.id === id) ?? null;
}
