import { Component } from "react";

// Class component (the older style): a class that extends Component.
//   - state is one object, this.state, created in the constructor
//   - this.setState() merges changes into that object
//   - render() returns the JSX
//   - props are read from this.props
class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Arrow function so "this" still points at the component inside onClick
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="stack">
        <p>
          {this.props.label}: {this.state.count}
        </p>
        <div className="row">
          <button onClick={this.increment}>+1</button>
        </div>
      </div>
    );
  }
}

export default ClassCounter;
