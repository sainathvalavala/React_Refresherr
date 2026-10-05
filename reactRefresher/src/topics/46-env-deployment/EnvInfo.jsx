// import.meta.env: Vite's environment variables. They are replaced with
// their actual values at BUILD time, so changing .env needs a restart of
// `npm run dev` or a new `npm run build`.
// Built in:
//   MODE     -> "development" (npm run dev) or "production" (npm run build)
//   DEV/PROD -> booleans for the same thing
//   BASE_URL -> the base path the app is served from
// Yours: only names starting with VITE_ are exposed to browser code.
const rows = [
  ["MODE", import.meta.env.MODE],
  ["DEV", String(import.meta.env.DEV)],
  ["PROD", String(import.meta.env.PROD)],
  ["BASE_URL", import.meta.env.BASE_URL],
  ["VITE_APP_TITLE", import.meta.env.VITE_APP_TITLE],
  ["VITE_API_URL", import.meta.env.VITE_API_URL],
  // Not prefixed with VITE_, so Vite never exposes it (undefined even if set)
  ["SECRET_KEY", String(import.meta.env.SECRET_KEY)],
];

function EnvInfo() {
  return (
    <table>
      <tbody>
        {rows.map(([name, value]) => (
          <tr key={name}>
            <td>
              <code>import.meta.env.{name}</code>
            </td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EnvInfo;
