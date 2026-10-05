import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./api";

// useMutation: for requests that CHANGE data (POST, PUT, DELETE). Unlike
// useQuery it doesn't run on render; you call mutate() when the user acts.
// After success you update the cache, so every component showing ["posts"]
// updates too. Usually you'd call queryClient.invalidateQueries({ queryKey:
// ["posts"] }) to refetch; this fake API doesn't really save, so we insert
// the new post into the cache directly with setQueryData.
function NewPostForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // The fake API returns id 101 for every post; give each a unique id for its list key
      const post = { ...newPost, id: Date.now() };
      queryClient.setQueryData(["posts"], (oldPosts = []) => [post, ...oldPosts]);
      setTitle("");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") return;
    mutation.mutate({ title: title.trim(), body: "Written in the React Refresher", userId: 1 });
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New post title" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Create post"}
      </button>
      {mutation.isError && <span className="field-error">{mutation.error.message}</span>}
      {mutation.isSuccess && <span>✅ Created with id {mutation.data.id}</span>}
    </form>
  );
}

export default NewPostForm;
