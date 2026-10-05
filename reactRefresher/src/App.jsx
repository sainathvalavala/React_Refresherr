import Student from "./Student";
import Counter from "./Counter";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Student name="Arun" age={25} isStudent={true} />
      <Student name="Priya" age={30} isStudent={false} />
      <Student />
      <Counter />
    </div>
  );
}

export default App;
