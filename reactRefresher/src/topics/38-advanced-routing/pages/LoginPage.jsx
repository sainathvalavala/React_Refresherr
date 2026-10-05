import { Form, useActionData, useNavigation, useSearchParams } from "react-router-dom";

// <Form method="post"> (capital F, from the router) submits to this route's
// action instead of the server. useActionData() holds what the action
// returned (here: a validation error). The hidden "from" field remembers
// where to go after logging in.
function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") ?? "/account";

  return (
    <Form method="post" className="stack">
      <h4>Log in</h4>
      {searchParams.get("from") && <p>You need to log in to see {from}.</p>}
      <input type="hidden" name="from" value={from} />
      <input name="name" placeholder="Your name" />
      {actionData?.error && <p className="field-error">{actionData.error}</p>}
      <div className="row">
        <button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </div>
    </Form>
  );
}

export default LoginPage;
