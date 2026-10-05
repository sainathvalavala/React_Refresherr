// The most common use of children: the content of a button, link or label.
// <FancyButton>Save</FancyButton> reads just like a normal <button>.
// "...rest" collects every OTHER prop (onClick, disabled, type...) and
// passes it straight to the real <button>.
function FancyButton({ children, ...rest }) {
  return (
    <button className="fancy-button" {...rest}>
      ✨ {children}
    </button>
  );
}

export default FancyButton;
