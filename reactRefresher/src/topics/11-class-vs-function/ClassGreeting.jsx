import { Component } from "react";

// The smallest class component: only a render() method, reading this.props.
// Classes set default props with "static defaultProps". (React 19 removed
// defaultProps for function components, which use destructuring defaults,
// but classes still support it.)
class ClassGreeting extends Component {
  static defaultProps = {
    name: "Guest",
  };

  render() {
    return <p>Hello from a class, {this.props.name}!</p>;
  }
}

export default ClassGreeting;
