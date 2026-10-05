import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import CounterDisplay from "./CounterDisplay";
import CounterButtons from "./CounterButtons";
import ShopShelf from "./ShopShelf";
import ShopCart from "./ShopCart";
import counterStoreCode from "./useCounterStore.js?raw";
import counterDisplayCode from "./CounterDisplay.jsx?raw";
import counterButtonsCode from "./CounterButtons.jsx?raw";
import cartStoreCode from "./useCartStore.js?raw";
import shopCartCode from "./ShopCart.jsx?raw";

function ZustandLesson() {
  return (
    <Lesson
      number={39}
      title="Zustand"
      definition="Zustand is a small state management library: one function, create(), makes a global store of state plus actions, and a hook to read it. Components subscribe to just the parts they select."
    >
      <Explain title="How it works">
        <CodeBlock
          code={`
npm install zustand

const useBearStore = create((set) => ({
  bears: 0,                                              // state
  addBear: () => set((s) => ({ bears: s.bears + 1 })),  // action
}));

function BearCounter() {
  const bears = useBearStore((s) => s.bears);   // select a slice
  return <p>{bears} bears</p>;
}
`}
        />
        <ul>
          <li>
            <strong>No provider.</strong> The store lives in a module; import the
            hook anywhere.
          </li>
          <li>
            <strong>State and actions together.</strong> Update logic sits in the
            store, not in components, like a reducer but with less ceremony.
          </li>
          <li>
            <strong>Selectors</strong> decide re-renders: a component re-renders
            only when its selected value changes (compared with{" "}
            <code>Object.is</code>).
          </li>
          <li>
            <strong>Works outside React</strong>: <code>useStore.getState()</code>,{" "}
            <code>useStore.setState()</code>, <code>useStore.subscribe()</code>.
          </li>
          <li>
            <strong>Middleware</strong>: <code>persist</code> (localStorage),{" "}
            <code>devtools</code> (Redux DevTools), <code>immer</code> (mutable-style
            updates).
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Context</th>
              <th>Jotai (24)</th>
              <th>Zustand</th>
              <th>Redux Toolkit (40)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>value from a provider</td>
              <td>many small atoms</td>
              <td>one store, select slices</td>
              <td>one store, slices + reducers</td>
            </tr>
            <tr>
              <td>Provider needed</td>
              <td>yes</td>
              <td>no</td>
              <td>no</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>Re-renders</td>
              <td>all consumers</td>
              <td>atom readers</td>
              <td>selector readers</td>
              <td>selector readers</td>
            </tr>
            <tr>
              <td>Boilerplate</td>
              <td>medium</td>
              <td>low</td>
              <td>very low</td>
              <td>higher, more structure</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. A store with selectors" code={counterStoreCode}>
        <div className="grid">
          <CounterDisplay />
          <CounterButtons />
        </div>
        <p className="hint">
          Click +1: only CounterDisplay re-renders. The "+10 in 1s" button
          updates the store from a plain setTimeout, outside any component.
        </p>
        <details>
          <summary>Show CounterDisplay.jsx</summary>
          <CodeBlock code={counterDisplayCode} />
        </details>
        <details>
          <summary>Show CounterButtons.jsx</summary>
          <CodeBlock code={counterButtonsCode} />
        </details>
      </Example>

      <Example title="2. A persisted cart with useShallow" code={cartStoreCode}>
        <ShopShelf />
        <ShopCart />
        <details>
          <summary>Show ShopCart.jsx</summary>
          <CodeBlock code={shopCartCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>const state = useStore()</code> with no selector. The component
            then re-renders on every change to anything in the store.
          </li>
          <li>
            Returning a new object or array from a selector without{" "}
            <code>useShallow</code>. Zustand 5 sees a "new" value every time, which
            leads to extra renders or a "Maximum update depth" loop.
          </li>
          <li>
            Mutating state inside an action (<code>state.items.push(x)</code>).
            Like useState, return new objects and arrays.
          </li>
          <li>
            One giant store for unrelated things. Several small stores (cart,
            auth, UI) stay easier to read.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ZustandLesson;
