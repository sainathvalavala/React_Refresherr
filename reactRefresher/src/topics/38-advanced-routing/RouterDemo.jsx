import { useState } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import RouteError from "./RouteError";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import { accountLoader, loginAction, logoutAction, productLoader, productsLoader } from "./loaders";

// A DATA ROUTER: routes are defined as objects, so each one can also have a
// loader, an action, an errorElement and lazy code. (Topics 15-17 used
// <Routes> JSX, which can't have loaders.)
// Real apps: createBrowserRouter(routes) + <RouterProvider router={router} /> in main.jsx.
const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage />, loader: productsLoader },
      { path: "products/:productId", element: <ProductPage />, loader: productLoader, errorElement: <RouteError /> },
      { path: "account", element: <AccountPage />, loader: accountLoader },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "logout", action: logoutAction },
      {
        path: "about",
        // lazy: import the page's code only when this route is first visited
        lazy: async () => {
          const { default: Component } = await import("./pages/AboutPage");
          return { Component };
        },
      },
    ],
  },
];

function RouterDemo() {
  // Create the router once per mount (memory history, so the real URL isn't touched)
  const [router] = useState(() => createMemoryRouter(routes));
  return <RouterProvider router={router} />;
}

export default RouterDemo;
