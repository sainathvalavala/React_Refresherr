import { useState } from "react";

// Object state: React only re-renders when it gets a NEW object, so never
// change the old one (profile.name = "x"). Copy it with the spread operator
// (...profile) and overwrite only the field that changed.
function ProfileForm() {
  const [profile, setProfile] = useState({ name: "Arun", city: "Hyderabad" });

  function handleChange(e) {
    // e.target.name is "name" or "city", so [e.target.name] updates that field
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  return (
    <div className="stack">
      <input name="name" value={profile.name} onChange={handleChange} />
      <input name="city" value={profile.city} onChange={handleChange} />
      <p>
        {profile.name} lives in {profile.city}
      </p>
    </div>
  );
}

export default ProfileForm;
