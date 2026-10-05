import { useState } from "react";
import useFetch from "./useFetch";

// All the fetching details are hidden in useFetch. This component only
// decides WHICH url to load and how to show each state.
function PostViewer() {
  const [postId, setPostId] = useState(1);
  const { data: post, error, isLoading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setPostId(Math.max(1, postId - 1))}>Previous</button>
        <span>Post #{postId}</span>
        <button onClick={() => setPostId(postId + 1)}>Next</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {post && (
        <p>
          <strong>{post.title}</strong>
        </p>
      )}
    </div>
  );
}

export default PostViewer;
