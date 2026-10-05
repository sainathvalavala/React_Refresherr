import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import PostsList from "./PostsList";
import PostViewerCached from "./PostViewerCached";
import NewPostForm from "./NewPostForm";
import apiCode from "./api.js?raw";
import postsListCode from "./PostsList.jsx?raw";
import postViewerCode from "./PostViewerCached.jsx?raw";
import newPostFormCode from "./NewPostForm.jsx?raw";

function TanStackQueryLesson() {
  // The QueryClient holds the cache. Create it ONCE (useState's lazy init,
  // not on every render) and provide it to the tree. Real apps do this in main.jsx.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Lesson
        number={37}
        title="TanStack Query (React Query)"
        definition="TanStack Query is a library for server state: data that lives on a server. It fetches, caches, deduplicates, retries and refreshes that data, so components just say which data they need."
      >
        <Explain title="How it works">
          <p>
            Topics 5, 19 and 36 hand-built fetching with effects. Real apps also
            need <strong>caching</strong> (don't refetch what you just loaded),{" "}
            <strong>deduplication</strong> (ten components asking for the same
            user should cause one request), <strong>retries</strong>,{" "}
            <strong>refetching</strong> when the window regains focus, and{" "}
            <strong>updating the cache</strong> after changes. TanStack Query
            does all of it.
          </p>
          <p>
            Its key idea: <strong>server state is not UI state</strong>. Data
            from a server is a cached copy that can go out of date. Keep it in
            the query cache, keyed by <code>queryKey</code>, not in
            useState.
          </p>
          <CodeBlock
            code={`
npm install @tanstack/react-query

// main.jsx: one client for the whole app
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>

// any component
const { data, isPending, isError } = useQuery({
  queryKey: ["user", userId],          // cache key (include every parameter)
  queryFn: () => getUser(userId),      // returns a promise
});
`}
          />
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fresh / stale</td>
                <td>
                  data younger than <code>staleTime</code> is fresh (used as-is);
                  older data is stale (shown, then refetched in the background)
                </td>
              </tr>
              <tr>
                <td>gcTime</td>
                <td>how long unused data stays in the cache (default 5 minutes)</td>
              </tr>
              <tr>
                <td>invalidate</td>
                <td>mark data stale so it refetches, e.g. after a mutation</td>
              </tr>
              <tr>
                <td>retry</td>
                <td>failed queries are retried 3 times before isError</td>
              </tr>
            </tbody>
          </table>
        </Explain>

        <Example title="1. useQuery: loading, error and data" code={postsListCode}>
          <PostsList />
          <details>
            <summary>Show api.js</summary>
            <CodeBlock code={apiCode} />
          </details>
        </Example>

        <Example title="2. Query keys with parameters, and the cache" code={postViewerCode}>
          <PostViewerCached />
        </Example>

        <Example title="3. useMutation: changing data and updating the cache" code={newPostFormCode}>
          <NewPostForm />
          <p className="hint">
            Create a post: it appears at the top of example 1's list, because both
            use the ["posts"] cache entry.
          </p>
        </Example>

        <Explain title="Common mistakes" warning>
          <ul>
            <li>
              Leaving parameters out of the key (<code>{'queryKey: ["post"]'}</code>{" "}
              with <code>getPost(id)</code>): every id shares one cache entry and
              shows the wrong post.
            </li>
            <li>
              Copying query data into useState. Then it no longer updates with the
              cache. Use <code>data</code> directly.
            </li>
            <li>
              Creating <code>new QueryClient()</code> inside a component body. A new
              empty cache every render.
            </li>
            <li>
              Fetch functions that don't throw on HTTP errors. TanStack Query only
              sees a failure if the promise rejects (check <code>response.ok</code>).
            </li>
            <li>
              Forgetting to invalidate or update the cache after a mutation, so the
              list on screen doesn't show the change.
            </li>
          </ul>
        </Explain>
      </Lesson>
    </QueryClientProvider>
  );
}

export default TanStackQueryLesson;
