import { useState } from "react";

// A useState setter REPLACES the value. With object state you must copy the
// other fields yourself with ...profile, or they are lost.
//   setProfile({ age: 26 }) -> name disappears!
// Often simpler: split it into two useState calls (name and age).
function FunctionProfile() {
  const [profile, setProfile] = useState({ name: "Arun", age: 25 });

  function haveBirthday() {
    setProfile({ ...profile, age: profile.age + 1 });
  }

  return (
    <div className="stack">
      <p>
        Function: {profile.name}, {profile.age}
      </p>
      <div className="row">
        <button onClick={haveBirthday}>Birthday</button>
      </div>
    </div>
  );
}

export default FunctionProfile;
