import PropTypes from "prop-types";

// A component with a full PropTypes specification, using most validators.
function UserProfile({ name, age, role = "member", tags = [], address, rating, avatar = null, children }) {
  return (
    <div className="card">
      {avatar}
      <h4>{name}</h4>
      {age !== undefined && <p>Age: {age}</p>}
      <p>Role: {role}</p>
      {address && <p>City: {address.city}</p>}
      {/* If tags is wrongly passed as a string, .join crashes: PropTypes only WARNS */}
      {tags.length > 0 && <p>Tags: {tags.join(", ")}</p>}
      {rating !== undefined && <p>Rating: {rating}/5</p>}
      {children}
    </div>
  );
}

UserProfile.propTypes = {
  // Primitive types. .isRequired warns when the prop is missing.
  name: PropTypes.string.isRequired,
  age: PropTypes.number,

  // One of a fixed set of values (like an enum)
  role: PropTypes.oneOf(["admin", "member", "guest"]),

  // An array where every item has a type
  tags: PropTypes.arrayOf(PropTypes.string),

  // An object with a known shape. Use PropTypes.exact() to also forbid extra keys.
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    pin: PropTypes.string,
  }),

  // Either of several types
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // A function (callbacks), a single React element, anything renderable
  onContact: PropTypes.func,
  avatar: PropTypes.element,
  children: PropTypes.node,

  // Custom validator: return an Error to fail, null to pass
  rating(props, propName, componentName) {
    const value = props[propName];
    if (value !== undefined && (typeof value !== "number" || value < 1 || value > 5)) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`: expected a number from 1 to 5, got ${value}.`);
    }
    return null;
  },
};

export default UserProfile;
