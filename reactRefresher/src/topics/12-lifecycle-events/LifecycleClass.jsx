import { Component } from "react";

// Lifecycle methods: functions React calls at fixed moments in a class
// component's life.
//   componentDidMount    -> once, right after it first appears on screen
//   componentDidUpdate   -> after every re-render caused by new props/state
//   componentWillUnmount -> just before it is removed (clean up here)
class LifecycleClass extends Component {
  componentDidMount() {
    console.log("[class] componentDidMount");
  }

  componentDidUpdate(prevProps) {
    console.log(`[class] componentDidUpdate: ${prevProps.count} -> ${this.props.count}`);
  }

  componentWillUnmount() {
    console.log("[class] componentWillUnmount");
  }

  render() {
    return <p>Class component sees count = {this.props.count}</p>;
  }
}

export default LifecycleClass;
