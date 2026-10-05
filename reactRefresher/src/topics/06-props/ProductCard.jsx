// Any JavaScript value can be a prop: strings, numbers, booleans, arrays,
// objects and functions. Only strings may use quotes, so everything else
// goes in curly braces:
//   <ProductCard name="Pen" price={20} tags={["a", "b"]} seller={{ name: "X" }} />
function ProductCard({ name, price, tags = [], seller, inStock = false }) {
  return (
    <div className="card">
      <h4>{name}</h4>
      <p>Rs. {price.toFixed(2)}</p>
      <p>
        Sold by {seller.name} ({seller.rating} stars)
      </p>
      <p>{inStock ? "In stock" : "Out of stock"}</p>
      <div className="row">
        {tags.map((tag) => (
          <code key={tag}>{tag}</code>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
