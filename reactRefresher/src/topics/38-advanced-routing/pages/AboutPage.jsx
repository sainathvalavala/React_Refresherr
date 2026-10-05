// Loaded with the route's `lazy` option: this file's code is only
// downloaded the first time someone visits /about (code splitting per route).
function AboutPage() {
  return <p>About: this page's code was lazy-loaded when you clicked the link.</p>;
}

export default AboutPage;
