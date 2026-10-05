import cx from "./cx";

// The "variants" pattern used by shadcn/ui (with the cva library) and most
// design systems: props like variant and size map to class names, so the
// rest of the app writes <Button variant="danger" size="sm"> and never
// touches CSS. ...rest forwards onClick, disabled, type, etc. to the real button.
const variantClasses = {
  primary: "ui-btn-primary",
  outline: "ui-btn-outline",
  danger: "ui-btn-danger",
};

const sizeClasses = {
  sm: "ui-btn-sm",
  md: "",
  lg: "ui-btn-lg",
};

function Button({ variant = "primary", size = "md", fullWidth = false, className, ...rest }) {
  return (
    <button
      className={cx("ui-btn", variantClasses[variant], sizeClasses[size], fullWidth && "ui-btn-full", className)}
      {...rest}
    />
  );
}

export default Button;
