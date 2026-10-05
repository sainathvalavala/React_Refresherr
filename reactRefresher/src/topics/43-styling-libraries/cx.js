// A tiny version of the popular `clsx` / `classnames` packages: joins
// class names and skips falsy values, which makes conditional classes easy.
//   cx("btn", isActive && "active", size === "lg" && "btn-lg")
//   -> "btn active" when isActive is true and size isn't "lg"
export default function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
