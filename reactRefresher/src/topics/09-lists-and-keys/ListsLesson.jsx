import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import NumberList from "./NumberList";
import UserList from "./UserList";
import TodoList from "./TodoList";
import SearchableList from "./SearchableList";
import MenuList from "./MenuList";
import ContactList from "./ContactList";
import numberListCode from "./NumberList.jsx?raw";
import userListCode from "./UserList.jsx?raw";
import todoListCode from "./TodoList.jsx?raw";
import searchableListCode from "./SearchableList.jsx?raw";
import menuListCode from "./MenuList.jsx?raw";
import contactListCode from "./ContactList.jsx?raw";
import contactItemCode from "./ContactItem.jsx?raw";

function ListsLesson() {
  return (
    <Lesson
      number={9}
      title="Lists and keys"
      definition="Lists are rendered by mapping an array to JSX elements. Each element needs a unique, stable key so React can track which item is which between renders."
    >
      <Explain title="How it works">
        <p>
          React can render an <strong>array of JSX elements</strong> directly:{" "}
          <code>{"{[<li>a</li>, <li>b</li>]}"}</code>. So to show a list, turn
          your data array into an element array with <code>.map()</code>.
        </p>
        <p>
          <strong>Why keys?</strong> When the list changes, React compares the
          old and new arrays. Without keys it can only match items by position,
          so inserting, deleting or reordering items gets confused. With keys
          it knows "this is still item 42, it just moved", and it keeps that
          item's DOM node and state.
        </p>
        <ul>
          <li>
            <strong>Unique among siblings:</strong> no two items in the same
            list share a key. Different lists can repeat keys.
          </li>
          <li>
            <strong>Stable:</strong> the same item gets the same key on every
            render. A database id is perfect.
          </li>
          <li>
            <strong>Placed on the outermost element</strong> returned from{" "}
            <code>map()</code>.
          </li>
          <li>
            The <strong>array index</strong> is acceptable only if the list
            never reorders, filters or has items inserted or removed.
          </li>
        </ul>
        <CodeBlock
          code={`
items.map(item => <li key={item.id}>{item.name}</li>)   // transform
items.filter(item => item.done)                         // keep some
[...items].sort((a, b) => a.price - b.price)            // order (copy first!)
items.find(item => item.id === id)                      // get one
items.reduce((sum, item) => sum + item.price, 0)        // total
`}
        />
      </Explain>

      <Example title="1. map() over an array" code={numberListCode}>
        <NumberList />
      </Example>

      <Example title="2. Objects with id keys, plus filter()" code={userListCode}>
        <UserList />
      </Example>

      <Example title="3. Search, sort and an empty state" code={searchableListCode}>
        <SearchableList />
      </Example>

      <Example title="4. Nested lists" code={menuListCode}>
        <MenuList />
      </Example>

      <Example title="5. Extracting the list item into a component" code={contactListCode}>
        <ContactList />
        <details>
          <summary>Show ContactItem.jsx</summary>
          <CodeBlock code={contactItemCode} />
        </details>
      </Example>

      <Example title="6. Index keys vs id keys" code={todoListCode}>
        <div className="grid">
          <div>
            <p>
              <strong>key=index</strong> (buggy)
            </p>
            <TodoList useIndexAsKey={true} />
          </div>
          <div>
            <p>
              <strong>key=todo.id</strong> (correct)
            </p>
            <TodoList useIndexAsKey={false} />
          </div>
        </div>
        <p className="hint">
          Type a different note in each input, then delete the first todo in
          both lists.
        </p>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            No key at all: the console warns 'Each child in a list should have
            a unique "key" prop'.
          </li>
          <li>
            Putting the key on an element <em>inside</em> the item instead of
            on the outermost one returned from <code>map()</code>.
          </li>
          <li>
            <code>{"key={Math.random()}"}</code>: a new key every render, so
            React throws away and recreates every item each time (slow, and
            inputs lose their text).
          </li>
          <li>
            Calling <code>.sort()</code> or <code>.reverse()</code> directly on
            state or props. They change the original array. Copy first:{" "}
            <code>[...items].sort()</code>.
          </li>
          <li>
            Using curly braces in the arrow function without a{" "}
            <code>return</code>: <code>{"items.map(x => { <li>{x}</li> })"}</code>{" "}
            renders nothing. (This was the original bug in your First.jsx!)
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ListsLesson;
