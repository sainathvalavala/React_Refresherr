import { useState } from "react";
import TypedProductCard from "./TypedProductCard";
import TypedList from "./TypedList";

type User = { id: string; name: string; isAdmin: boolean };

const users: User[] = [
  { id: "u1", name: "Arun", isAdmin: true },
  { id: "u2", name: "Priya", isAdmin: false },
];

// Uses the typed components. Try un-commenting the broken lines below and
// running `npm run typecheck`: each one is a compile error.
function TypeScriptDemo() {
  const [cartIds, setCartIds] = useState<number[]>([]);

  // <TypedProductCard product={{ id: 1, name: "Pen" }} onAdd={() => {}} />
  //   ❌ Property 'price' is missing in type '{ id: number; name: string; }'
  //      but required in type 'Product'.
  // <TypedProductCard product={pen} onAdd={() => {}} variant="huge" />
  //   ❌ Type '"huge"' is not assignable to type '"compact" | "full" | undefined'.

  return (
    <div className="stack">
      <div className="grid">
        <TypedProductCard
          product={{ id: 1, name: "Notebook", price: 120, tags: ["paper"] }}
          onAdd={(id) => setCartIds([...cartIds, id])}
        />
        <TypedProductCard
          product={{ id: 2, name: "Gel pen", price: 35 }}
          onAdd={(id) => setCartIds([...cartIds, id])}
          variant="compact"
        />
      </div>
      <p>Cart product ids: {cartIds.join(", ") || "empty"}</p>
      <strong>Generic list of users (T = User)</strong>
      <TypedList
        items={users}
        getKey={(user) => user.id}
        renderItem={(user) => `${user.name}${user.isAdmin ? " (admin)" : ""}`}
      />
    </div>
  );
}

export default TypeScriptDemo;
