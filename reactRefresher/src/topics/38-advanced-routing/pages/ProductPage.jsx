import { Link, useLoaderData } from "react-router-dom";

function ProductPage() {
  const product = useLoaderData();

  return (
    <div className="stack">
      <h4>{product.name}</h4>
      <p>Rs. {product.price}</p>
      <Link to="/products">All products</Link>
    </div>
  );
}

export default ProductPage;
