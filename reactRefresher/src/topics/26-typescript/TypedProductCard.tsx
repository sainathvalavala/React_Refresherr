// Typing props: describe the props object with a `type` (or `interface`),
// then annotate the destructured parameter. TypeScript now checks every
// <TypedProductCard ...> usage in your editor.
type Product = {
  id: number;
  name: string;
  price: number;
  tags?: string[]; // ? = optional
};

type TypedProductCardProps = {
  product: Product;
  onAdd: (id: number) => void; // a function prop, with its argument and return types
  variant?: "compact" | "full"; // a union of literal values (like PropTypes.oneOf)
};

function TypedProductCard({ product, onAdd, variant = "full" }: TypedProductCardProps) {
  return (
    <div className="card">
      <h4>{product.name}</h4>
      <p>Rs. {product.price.toFixed(2)}</p>
      {/* product.tags may be undefined, so TypeScript makes us check first */}
      {variant === "full" && product.tags && <p>Tags: {product.tags.join(", ")}</p>}
      <div className="row">
        <button onClick={() => onAdd(product.id)}>Add to cart</button>
      </div>
    </div>
  );
}

export default TypedProductCard;
