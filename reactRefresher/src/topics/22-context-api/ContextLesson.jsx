import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ContextApp from "./ContextApp";
import { LanguageContext } from "./LanguageContext";
import LanguageGreeting from "./LanguageGreeting";
import CartProvider from "./CartProvider";
import ProductShelf from "./ProductShelf";
import CartSummary from "./CartSummary";
import contextAppCode from "./ContextApp.jsx?raw";
import userContextCode from "./UserContext.js?raw";
import userGreetingCode from "./UserGreeting.jsx?raw";
import renameButtonCode from "./RenameButton.jsx?raw";
import languageGreetingCode from "./LanguageGreeting.jsx?raw";
import cartProviderCode from "./CartProvider.jsx?raw";
import useCartCode from "./useCart.js?raw";
import cartSummaryCode from "./CartSummary.jsx?raw";

function ContextLesson() {
  return (
    <Lesson
      number={22}
      title="Context API"
      definition="Context lets a parent make a value available to every component below it without passing props through each level. It is React's built-in fix for prop drilling."
    >
      <Explain title="How it works">
        <p>Context has three steps:</p>
        <CodeBlock
          code={`
// 1. Create it (own file, so anyone can import it)
export const UserContext = createContext(defaultValue);

// 2. Provide a value high in the tree
<UserContext value={{ user, setUser }}>
  <Page />
</UserContext>

// 3. Read it anywhere below, at any depth
const { user } = useContext(UserContext);
`}
        />
        <ul>
          <li>
            <strong>Nearest provider wins.</strong> A component reads the
            closest provider above it, so providers can be nested to override
            the value for one part of the tree.
          </li>
          <li>
            <strong>Default value</strong>: used only when there is no provider
            above at all. It is <em>not</em> a fallback for{" "}
            <code>{"value={undefined}"}</code>.
          </li>
          <li>
            <strong>Re-renders</strong>: when the provider's value changes,
            every component that reads that context re-renders, even if it uses
            only part of the value.
          </li>
          <li>
            <strong>To let children change it</strong>, put the setter (or
            functions like <code>addItem</code>) into the value.
          </li>
          <li>
            <strong>Syntax</strong>: React 19 renders the context directly (
            <code>{"<UserContext value>"}</code>). Older code writes{" "}
            <code>{"<UserContext.Provider value>"}</code>. React 19 also adds{" "}
            <code>use(UserContext)</code>, which, unlike useContext, can be
            called inside if statements.
          </li>
        </ul>
        <p>
          <strong>Good uses:</strong> data that many components at many
          depths need, such as the logged-in user, theme, language or a cart.{" "}
          <strong>Not for:</strong> every piece of state, or state that changes
          on every keystroke, because all consumers would re-render.
        </p>
      </Explain>

      <Example title="1. The topic 21 example, rewritten with context" code={contextAppCode}>
        <ContextApp />
        <details>
          <summary>Show UserContext.js</summary>
          <CodeBlock code={userContextCode} />
        </details>
        <details>
          <summary>Show UserGreeting.jsx (reads it)</summary>
          <CodeBlock code={userGreetingCode} />
        </details>
        <details>
          <summary>Show RenameButton.jsx (changes it)</summary>
          <CodeBlock code={renameButtonCode} />
        </details>
      </Example>

      <Example title="2. Default value and nested providers" code={languageGreetingCode}>
        <div className="stack">
          <strong>No provider (default):</strong>
          <LanguageGreeting />

          <LanguageContext value="Telugu">
            <strong>Inside value="Telugu":</strong>
            <LanguageGreeting />

            <LanguageContext value="Hindi">
              <strong>Nested value="Hindi" overrides it:</strong>
              <LanguageGreeting />
            </LanguageContext>
          </LanguageContext>
        </div>
        <CodeBlock
          code={`
<LanguageGreeting />                 // "English" (default)
<LanguageContext value="Telugu">
  <LanguageGreeting />               // "Telugu"
  <LanguageContext value="Hindi">
    <LanguageGreeting />             // "Hindi" (nearest provider wins)
  </LanguageContext>
</LanguageContext>
`}
        />
      </Example>

      <Example title="3. Provider component + custom hook: a shopping cart" code={cartProviderCode}>
        <CartProvider>
          <ProductShelf />
          <CartSummary />
        </CartProvider>
        <details>
          <summary>Show useCart.js</summary>
          <CodeBlock code={useCartCode} />
        </details>
        <details>
          <summary>Show CartSummary.jsx</summary>
          <CodeBlock code={cartSummaryCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Forgetting the provider. useContext silently returns the default
            value, which is why <code>useCart</code> throws an error to make
            the mistake obvious.
          </li>
          <li>
            Reading the context in the <em>same</em> component that renders the
            provider. useContext looks <em>above</em> the component, so it
            won't see its own provider.
          </li>
          <li>
            Calling <code>createContext</code> inside a component. That makes a
            new context every render. Create it once, at module level.
          </li>
          <li>
            One giant context for everything. Any change re-renders every
            consumer. Split it by concern (UserContext, ThemeContext, CartContext).
          </li>
          <li>
            Using context to avoid passing a prop one or two levels. Plain props
            are clearer.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ContextLesson;
