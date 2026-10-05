import { data, redirect } from "react-router-dom";
import { fakeAuth } from "./fakeAuth";
import { getProduct, getProducts } from "./fakeDb";

// LOADERS run BEFORE a route renders. The router waits for them, then the
// page reads the result with useLoaderData(). There's no loading state or
// effect inside the page: the data is simply there.
export function productsLoader() {
  return getProducts();
}

// Loaders receive the URL params. Throwing a response with a status sends
// the user to the route's errorElement instead of the page.
export async function productLoader({ params }) {
  const product = await getProduct(params.productId);
  if (!product) {
    throw data(`No product with id "${params.productId}"`, { status: 404 });
  }
  return product;
}

// A PROTECTED route: the loader checks auth first. Returning redirect()
// sends the user to /login, and the page component never renders, so
// private data can't flash on screen.
export function accountLoader({ request }) {
  if (!fakeAuth.user) {
    const from = new URL(request.url).pathname;
    return redirect(`/login?from=${encodeURIComponent(from)}`);
  }
  return { user: fakeAuth.user };
}

// ACTIONS handle <Form method="post"> submissions for a route. They get
// the form data, do the mutation, and return either data (errors) or a redirect.
export async function loginAction({ request }) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  if (name === "") {
    return { error: "Please enter your name." };
  }
  fakeAuth.login(name);
  return redirect(String(formData.get("from") || "/account"));
}

export function logoutAction() {
  fakeAuth.logout();
  return redirect("/");
}
