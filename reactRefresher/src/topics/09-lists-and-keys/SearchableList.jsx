import { useState } from "react";

const fruits = [
  { id: 1, name: "Mango", price: 120 },
  { id: 2, name: "Banana", price: 40 },
  { id: 3, name: "Apple", price: 180 },
  { id: 4, name: "Guava", price: 60 },
  { id: 5, name: "Papaya", price: 70 },
];

// filter + sort + map: the usual pipeline for showing a list.
//   filter -> keep only what matches the search
//   sort   -> order it. sort() CHANGES the array it's called on. Here that
//             is the new array filter() returned, so fruits is untouched.
//             Sorting without filtering? Copy first: [...fruits].sort(...)
//   map    -> turn each item into JSX
// The original array is never changed; we derive a new one every render.
function SearchableList() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const visible = fruits
    .filter((fruit) => fruit.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : a.price - b.price));

  return (
    <div className="stack">
      <div className="row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search fruit" />
        <button onClick={() => setSortBy("name")}>Sort by name</button>
        <button onClick={() => setSortBy("price")}>Sort by price</button>
      </div>
      {/* Empty state: always handle the "nothing to show" case */}
      {visible.length === 0 ? (
        <p>No fruit matches "{search}".</p>
      ) : (
        <ul>
          {visible.map((fruit) => (
            <li key={fruit.id}>
              {fruit.name}: Rs. {fruit.price}/kg
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableList;
