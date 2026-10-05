import { MemoryRouter, Routes, Route } from "react-router-dom";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import AddressBar from "../../components/AddressBar";
import SiteLayout from "./SiteLayout";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import siteLayoutCode from "./SiteLayout.jsx?raw";
import recipesPageCode from "./pages/RecipesPage.jsx?raw";
import recipeDetailPageCode from "./pages/RecipeDetailPage.jsx?raw";
import favoritesPageCode from "./pages/FavoritesPage.jsx?raw";
import recipesDataCode from "./recipes.js?raw";

// Building a website: a typical folder structure
//   recipes.js     -> data
//   SiteLayout.jsx -> shared shell with active nav links + shared state
//   pages/         -> one component per route
function WebsiteLesson() {
  return (
    <Lesson
      number={17}
      title="Building a website"
      definition="A website in React is a layout, a set of page components and the routes that connect them, with the data kept separate from the UI."
    >
      <Explain title="How to plan a React website">
        <ol>
          <li>
            <strong>List the pages and their URLs.</strong> Home{" "}
            <code>/</code>, list <code>/recipes</code>, detail{" "}
            <code>/recipes/:recipeId</code>, favorites, about, and a 404.
          </li>
          <li>
            <strong>Find what's shared.</strong> The header, nav and footer go in
            a layout route (topic 16).
          </li>
          <li>
            <strong>Decide where data lives.</strong> Static data in its own file
            (later: fetched from an API). State needed by several pages (favorites)
            is lifted to their common parent, here the layout.
          </li>
          <li>
            <strong>Decide what goes in the URL.</strong> Anything worth
            bookmarking or sharing: which recipe (<code>:recipeId</code>) and the
            search text (<code>?q=</code>).
          </li>
          <li>
            <strong>Build page by page</strong>, then handle the edge cases:
            empty lists, unknown ids, unknown URLs.
          </li>
        </ol>
        <CodeBlock
          code={`
17-website/
├── recipes.js              data
├── SiteLayout.jsx          header + nav + footer + favorites state
├── WebsiteLesson.jsx       the router and route table
└── pages/
    ├── HomePage.jsx
    ├── RecipesPage.jsx     list + search (?q=)
    ├── RecipeDetailPage.jsx  /recipes/:recipeId
    ├── FavoritesPage.jsx
    ├── AboutPage.jsx
    └── NotFoundPage.jsx
`}
        />
      </Explain>

      <Example title="Recipe Box (try every page)">
        <MemoryRouter>
          <div className="browser">
            <AddressBar />
            <Routes>
              <Route path="/" element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="recipes" element={<RecipesPage />} />
                <Route path="recipes/:recipeId" element={<RecipeDetailPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </MemoryRouter>
      </Example>

      <Explain title="Which earlier topic each feature uses">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Concept</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Recipe list, steps list</td>
              <td>Lists and keys (9)</td>
            </tr>
            <tr>
              <td>"No recipes match", unknown recipe id</td>
              <td>Conditional rendering (7)</td>
            </tr>
            <tr>
              <td>Search box, favorites</td>
              <td>useState (3), lifting state (20)</td>
            </tr>
            <tr>
              <td>Header, nav, footer on every page</td>
              <td>Layouts + Outlet (16)</td>
            </tr>
            <tr>
              <td>Highlighted current page</td>
              <td>NavLink + className function (15)</td>
            </tr>
            <tr>
              <td>
                <code>/recipes/:recipeId</code>, <code>?q=</code>
              </td>
              <td>useParams, useSearchParams (15)</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="The layout with shared favorites state" code={siteLayoutCode}>
        <p>Holds favorites and passes them to every page through Outlet context.</p>
      </Example>

      <Example title="The list page with search in the URL" code={recipesPageCode}>
        <p>Search "rice", open the recipe, press Back: the search is still there.</p>
      </Example>

      <Example title="The detail page" code={recipeDetailPageCode}>
        <p>Reads :recipeId, handles unknown ids, toggles a favorite.</p>
      </Example>

      <Example title="The favorites page (derived data)" code={favoritesPageCode}>
        <details>
          <summary>Show recipes.js (the data)</summary>
          <CodeBlock code={recipesDataCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Putting the whole site in one giant component. Split it into a
            layout and pages from the start.
          </li>
          <li>
            Keeping shared state inside one page. It's lost when you navigate
            away. Lift it to the layout (or use context, topic 22).
          </li>
          <li>
            Storing a filtered copy of the data in state. Derive it with{" "}
            <code>filter()</code> during render instead.
          </li>
          <li>
            Forgetting the "not found" cases: an unknown <code>:recipeId</code>{" "}
            should show a message, not crash on <code>undefined.name</code>.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default WebsiteLesson;
