import { Link, useLoaderData } from "react-router-dom";

// No useEffect, no loading state: the loader already ran, so the data is ready.
function ProductsPage() {
  const products = useLoaderData();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ProductsPage;
