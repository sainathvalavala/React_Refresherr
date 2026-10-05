import Header from "./Header";

// Page doesn't use user. It only forwards it: this is the "drilling".
function Page({ user }) {
  return (
    <div className="nested">
      Page (just passing user down)
      <Header user={user} />
    </div>
  );
}

export default Page;
