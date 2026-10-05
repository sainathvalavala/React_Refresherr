import type { ReactNode } from "react";

// Generic component: <T> is a type parameter, filled in from the items you
// pass. With items={users}, T becomes the user type, so renderItem's
// argument is known to be a user. One component, fully typed for any data.
type TypedListProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode; // ReactNode = anything renderable
  emptyText?: string;
};

function TypedList<T>({ items, getKey, renderItem, emptyText = "Nothing to show" }: TypedListProps<T>) {
  if (items.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

export default TypedList;
