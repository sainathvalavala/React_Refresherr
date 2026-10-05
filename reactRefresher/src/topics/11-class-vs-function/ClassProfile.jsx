import { Component } from "react";

// this.setState MERGES: passing { age } updates age and keeps name as it was.
// Class fields (state = ..., method = () => ...) avoid the constructor and
// the "this" binding problem entirely.
class ClassProfile extends Component {
  state = { name: "Arun", age: 25 };

  haveBirthday = () => {
    this.setState({ age: this.state.age + 1 }); // name is kept automatically
  };

  render() {
    return (
      <div className="stack">
        <p>
          Class: {this.state.name}, {this.state.age}
        </p>
        <div className="row">
          <button onClick={this.haveBirthday}>Birthday</button>
        </div>
      </div>
    );
  }
}

export default ClassProfile;
