import Header from "./Header";

// No user prop any more: Page doesn't need to know about it.
function Page() {
  return (
    <div className="nested">
      Page (no props)
      <Header />
    </div>
  );
}

export default Page;
