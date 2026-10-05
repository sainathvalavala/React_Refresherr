import useCart from "./useCart";

const products = [
  { id: "p1", name: "Notebook", price: 120 },
  { id: "p2", name: "Gel pen", price: 35 },
  { id: "p3", name: "Backpack", price: 900 },
];

// Adds to the cart without receiving any props: it gets addItem from context.
function ProductShelf() {
  const { addItem } = useCart();

  return (
    <div className="row">
      {products.map((product) => (
        <button key={product.id} onClick={() => addItem(product)}>
          Add {product.name} (Rs. {product.price})
        </button>
      ))}
    </div>
  );
}

export default ProductShelf;
