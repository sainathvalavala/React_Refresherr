import { useCartStore } from "./useCartStore";

const products = [
  { name: "Tea", price: 120 },
  { name: "Coffee", price: 350 },
  { name: "Biscuits", price: 40 },
];

function ShopShelf() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="row">
      {products.map((p) => (
        <button key={p.name} onClick={() => addItem(p.name, p.price)}>
          Add {p.name} (Rs. {p.price})
        </button>
      ))}
    </div>
  );
}

export default ShopShelf;
