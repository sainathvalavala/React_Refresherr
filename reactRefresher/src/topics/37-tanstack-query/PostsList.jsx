import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api";

// useQuery({ queryKey, queryFn }):
//   queryKey -> the cache key. The same key anywhere in the app = the same cached data.
//   queryFn  -> the function that fetches it.
// It returns the data plus every status flag you'd otherwise write yourself:
//   isPending  -> no data yet (first load)
//   isError    -> the last attempt failed (after 3 automatic retries)
//   isFetching -> a request is in flight, including background refetches
function PostsList() {
  const { data: posts, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isPending) return <p className="skeleton">⏳ Loading posts...</p>;
  if (isError) return <p className="error-box">Error: {error.message}</p>;

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => refetch()}>Refetch</button>
        {isFetching && <span>🔄 Updating in the background...</span>}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
