import PropTypes from "prop-types";

// Props (properties): read-only data passed from a parent component to a child,
// like arguments to a function. React passes them as ONE object, so we
// destructure it: { name, age, isStudent }. Values after "=" are defaults
// used when the parent doesn't pass that prop.
function Student({ name = "Guest", age = 0, isStudent = false }) {
  return (
    <div className="student">
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Student: {isStudent ? "Yes" : "No"}</p>
    </div>
  );
}

// PropTypes: declare the expected type of each prop (string, number, bool...).
// In older React versions a wrong type logged a warning in the console.
// React 19 no longer runs these checks, so this now serves as documentation;
// use TypeScript for real type checking.
Student.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  isStudent: PropTypes.bool,
};

export default Student;
