import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import RenderingTimeline from "./RenderingTimeline";
import renderingTimelineCode from "./RenderingTimeline.jsx?raw";

function NextJsLesson() {
  return (
    <Lesson
      number={47}
      title="Next.js and Server Components"
      definition="Next.js is a React framework that adds file-based routing, server-side rendering and React Server Components: components that run only on the server, fetch data directly, and send HTML instead of JavaScript."
    >
      <Explain title="How it works">
        <p>
          Everything in this app is <strong>client-side rendered</strong>: the
          browser gets an empty page plus a JavaScript bundle and builds the UI
          itself. That's simple, but the first view waits for the JS, search
          engines see an empty page at first, and every component's code ships to
          the browser.
        </p>
        <p>
          A <strong>framework</strong> like Next.js (or React Router's framework
          mode, or Remix) also runs React <em>on a server</em>:
        </p>
        <ul>
          <li>
            <strong>Server Components</strong> (the default in Next.js's App
            Router): run only on the server. They can be <code>async</code>, query
            a database or read files directly, and ship <strong>zero JavaScript</strong>{" "}
            to the browser. They can't use state, effects or event handlers.
          </li>
          <li>
            <strong>Client Components</strong>: files that start with{" "}
            <code>"use client"</code>. They're rendered to HTML on the server too,
            then hydrated in the browser, so they can use useState, onClick, and so on.
          </li>
          <li>
            <strong>Server Functions / Actions</strong>: functions marked{" "}
            <code>"use server"</code> that run on the server but can be called from
            a form's <code>action</code> (topic 28) or a button.
          </li>
          <li>
            <strong>File-based routing</strong>: <code>app/blog/[slug]/page.tsx</code>{" "}
            becomes the route <code>/blog/:slug</code>, with <code>layout.tsx</code>{" "}
            (topic 16), <code>loading.tsx</code> (Suspense, topic 31) and{" "}
            <code>error.tsx</code> (error boundary, topic 13) built in.
          </li>
        </ul>
      </Explain>

      <Example title="1. Rendering strategies, step by step" code={renderingTimelineCode}>
        <RenderingTimeline />
      </Example>

      <Example title="2. App Router file structure">
        <CodeBlock
          code={`
npx create-next-app@latest my-app

app/
├── layout.tsx          root layout: <html>, <body>, shared nav (wraps every page)
├── page.tsx            "/"
├── loading.tsx         shown while a page's data loads (a Suspense fallback)
├── error.tsx           shown if a page throws (an error boundary, "use client")
├── blog/
│   ├── page.tsx        "/blog"
│   └── [slug]/
│       └── page.tsx    "/blog/:slug"   (params.slug)
└── api/hello/route.ts  an API endpoint: GET/POST handlers
`}
        />
      </Example>

      <Example title="3. A Server Component fetching data">
        <CodeBlock
          code={`
// app/blog/page.tsx: a Server Component (the default; no directive needed)
// It's async, and it can talk to the database directly. This code and any
// secrets in it never reach the browser.
import { db } from "@/lib/db";
import LikeButton from "./LikeButton";

export default async function BlogPage() {
  const posts = await db.post.findMany();   // runs on the server

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
          <LikeButton postId={post.id} />   {/* an interactive island */}
        </li>
      ))}
    </ul>
  );
}
`}
        />
      </Example>

      <Example title="4. A Client Component for interactivity">
        <CodeBlock
          code={`
// app/blog/LikeButton.tsx
"use client";                       // this file and its imports run in the browser
import { useState } from "react";

export default function LikeButton({ postId }: { postId: number }) {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>;
}
`}
        />
      </Example>

      <Example title="5. A Server Action from a form">
        <CodeBlock
          code={`
// app/blog/new/page.tsx
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function createPost(formData: FormData) {
  "use server";                     // runs on the server, called from the browser
  await db.post.create({ data: { title: String(formData.get("title")) } });
  redirect("/blog");
}

export default function NewPostPage() {
  return (
    <form action={createPost}>      {/* the same <form action> as topic 28 */}
      <input name="title" />
      <button>Publish</button>
    </form>
  );
}
`}
        />
      </Example>

      <Explain title="Vite SPA or Next.js?">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Vite + React (this app)</th>
              <th>Next.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rendering</td>
              <td>in the browser only</td>
              <td>server + browser (SSR, SSG, RSC)</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>add React Router</td>
              <td>built in, file-based</td>
            </tr>
            <tr>
              <td>Backend code</td>
              <td>a separate server or API</td>
              <td>API routes + server actions in the same project</td>
            </tr>
            <tr>
              <td>Hosting</td>
              <td>any static host</td>
              <td>a Node server or platform (Vercel, Netlify...)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>dashboards, internal tools, apps behind a login, learning</td>
              <td>public sites needing SEO and fast first load, full-stack apps</td>
            </tr>
          </tbody>
        </table>
        <p>
          Everything from topics 1–46 carries over: Next.js <em>is</em> React, plus
          a server.
        </p>
      </Explain>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using <code>useState</code>, <code>useEffect</code> or{" "}
            <code>onClick</code> in a Server Component: an error. Move that part into
            a small <code>"use client"</code> component.
          </li>
          <li>
            Putting <code>"use client"</code> at the top of everything. That gives
            up the benefits of Server Components; keep client parts small (leaves of
            the tree).
          </li>
          <li>
            Passing functions or class instances from a Server Component to a Client
            Component as props. Only serializable data (strings, numbers, plain
            objects) can cross that boundary.
          </li>
          <li>
            Reading <code>window</code> or <code>localStorage</code> during render in
            a client component. They don't exist on the server; use them in effects.
          </li>
          <li>
            Rendering different output on the server and the client (e.g.{" "}
            <code>Date.now()</code> or <code>Math.random()</code> in JSX), which causes a
            "hydration mismatch" error.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default NextJsLesson;
