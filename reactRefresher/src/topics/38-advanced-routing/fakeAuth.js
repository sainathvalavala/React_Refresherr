// A pretend auth service. It lives outside React on purpose: loaders and
// actions run outside components, so they can't use hooks or context.
// Real apps would check a session cookie or token here.
export const fakeAuth = {
  user: null,
  login(name) {
    this.user = { name };
  },
  logout() {
    this.user = null;
  },
};
