import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api";

// Parameters belong in the query key: ["post", 3] and ["post", 4] are
// separate cache entries. Visit post 3, then 4, then 3 again: the second
// visit to 3 is INSTANT, because it's read from the cache.
// staleTime (set on the QueryClient in the lesson) controls how long cached
// data counts as fresh before React Query refetches it in the background.
function PostViewerCached() {
  const [postId, setPostId] = useState(1);

  const { data: post, isPending, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return (
    <div className="stack">
      <div className="row">
        {[1, 2, 3, 4, 5].map((id) => (
          <button key={id} onClick={() => setPostId(id)} disabled={id === postId}>
            Post {id}
          </button>
        ))}
        {isFetching && <span>🔄</span>}
      </div>
      {isPending ? <p className="skeleton">⏳ Loading post {postId}...</p> : <p className="card">{post.title}</p>}
    </div>
  );
}

export default PostViewerCached;
