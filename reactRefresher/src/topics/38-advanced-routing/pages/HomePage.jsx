function HomePage() {
  return (
    <p>
      Home. Try Products (a loader), Missing product (an errorElement),
      Account (protected: redirects to login) and About (lazy-loaded code).
    </p>
  );
}

export default HomePage;
