import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import DivVsButton from "./DivVsButton";
import Disclosure from "./Disclosure";
import CartAnnouncer from "./CartAnnouncer";
import AccessibleEmailField from "./AccessibleEmailField";
import divVsButtonCode from "./DivVsButton.jsx?raw";
import disclosureCode from "./Disclosure.jsx?raw";
import cartAnnouncerCode from "./CartAnnouncer.jsx?raw";
import emailFieldCode from "./AccessibleEmailField.jsx?raw";

function AccessibilityLesson() {
  return (
    <Lesson
      number={44}
      title="Accessibility (a11y)"
      definition="Accessibility means everyone can use your app, including people using a keyboard only, a screen reader, zoom, or voice control. Most of it comes from using the right HTML elements; ARIA attributes fill the gaps."
    >
      <Explain title="How it works">
        <p>
          A screen reader doesn't see your CSS; it reads the{" "}
          <strong>accessibility tree</strong>, which the browser builds from your
          HTML: each element's role (button, link, heading), name (its text or
          label) and state (expanded, checked, invalid). React renders plain HTML,
          so the same rules apply:
        </p>
        <ol>
          <li>
            <strong>Use semantic HTML first.</strong> <code>{"<button>"}</code>,{" "}
            <code>{"<a href>"}</code>, <code>{"<nav>"}</code>,{" "}
            <code>{"<main>"}</code>, <code>{"<h1>"}</code>–<code>{"<h6>"}</code>,{" "}
            <code>{"<label>"}</code>, <code>{"<ul>"}</code>. They bring keyboard
            support and roles for free.
          </li>
          <li>
            <strong>Everything works with a keyboard</strong>: Tab to reach it,
            Enter/Space to use it, a visible focus outline, and Escape to close things.
          </li>
          <li>
            <strong>Everything has a name</strong>: form fields have labels, icon
            buttons have <code>aria-label</code>, and images have <code>alt</code>{" "}
            (<code>alt=""</code> for decorative ones).
          </li>
          <li>
            <strong>ARIA only when HTML can't say it</strong>:{" "}
            <code>aria-expanded</code>, <code>aria-live</code>,{" "}
            <code>aria-invalid</code>. "No ARIA is better than bad ARIA."
          </li>
          <li>
            <strong>Manage focus</strong> when the UI changes a lot: move it into a
            modal when it opens and back when it closes (topic 32).
          </li>
        </ol>
        <p>
          In JSX, ARIA attributes keep their dashes (<code>aria-label</code>,{" "}
          <code>aria-expanded</code>), unlike other camelCase props.
        </p>
      </Explain>

      <Example title="1. Real buttons vs clickable divs (try Tab + Enter)" code={divVsButtonCode}>
        <DivVsButton />
      </Example>

      <Example title="2. A disclosure with aria-expanded" code={disclosureCode}>
        <Disclosure title="Shipping details">
          <p>Free delivery on orders over Rs. 500.</p>
        </Disclosure>
        <Disclosure title="Returns">
          <p>Return within 30 days.</p>
        </Disclosure>
      </Example>

      <Example title="3. Announcing changes with a live region" code={cartAnnouncerCode}>
        <CartAnnouncer />
      </Example>

      <Example title="4. Accessible form errors" code={emailFieldCode}>
        <AccessibleEmailField />
      </Example>

      <Example title="5. Names for images and icon buttons">
        <CodeBlock
          code={`
<img src="chart.png" alt="Sales rose 20% from March to April" />  // informative
<img src="divider.png" alt="" />                                   // decorative: skipped

<button aria-label="Close dialog">✕</button>   // icon-only button needs a name
<a href="/cart" aria-label="Cart, 3 items">🛒 3</a>

<svg aria-hidden="true">...</svg>             // purely decorative icon
`}
        />
      </Example>

      <Explain title="How to check your app">
        <ul>
          <li>
            <strong>Unplug your mouse</strong>: can you do everything with Tab,
            Shift+Tab, Enter, Space, the arrow keys and Escape?
          </li>
          <li>
            <strong>Lighthouse</strong> (Chrome DevTools &gt; Lighthouse &gt;
            Accessibility) and the <strong>axe DevTools</strong> extension find
            missing labels, low contrast and wrong ARIA.
          </li>
          <li>
            <strong>eslint-plugin-jsx-a11y</strong> flags many problems as you type.
          </li>
          <li>
            Try a <strong>screen reader</strong>: NVDA (Windows, free), VoiceOver
            (Mac: Cmd+F5), TalkBack (Android).
          </li>
          <li>
            Testing Library's <code>getByRole</code> (topic 41) fails when roles and
            names are missing, so good tests push you toward accessible markup.
          </li>
        </ul>
      </Explain>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>{"<div onClick>"}</code> or <code>{"<span onClick>"}</code> for
            actions. Use <code>{"<button>"}</code> (or <code>{"<a href>"}</code>{" "}
            for navigation).
          </li>
          <li>
            Inputs with only a placeholder. Placeholders disappear when typing and
            aren't reliable labels.
          </li>
          <li>
            <code>outline: none</code> on focus without a replacement. Keyboard users
            can no longer see where they are.
          </li>
          <li>Color as the only signal (red border = error). Add text or an icon too.</li>
          <li>
            Adding <code>role="button"</code> to a div and stopping there. You'd
            still need tabIndex and Enter/Space handling. Just use a button.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default AccessibilityLesson;
