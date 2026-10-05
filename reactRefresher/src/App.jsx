import Student from "./Student";

function App() {
  return (
    <>
      <Student name="Arun" age={25} isStudent={true} />
      <Student name="Priya" age={30} isStudent={false} />
      <Student />
    </>
  );
}

export default App;
