import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./components/ErrorPage";
import { RepoList } from "./components/RepoList";
import DependencyList from "./components/DependencyList";
import { GithubAuth } from "./components/GithubAuth";
import { GithubProfile } from "./components/GithubProfile";
// import Spinner from "./components/Spinner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<GithubAuth />} />
      {/* <Route index element={<Spinner />} /> */}
      {/* <Route index element={<TestComp />} /> */}
      <Route path="github/success" element={<GithubProfile />} />
      <Route path="repos" element={<RepoList />} />
      <Route path="repos/:repo/dependencies" element={<DependencyList />} />
    </Route>
  )
);

// ToDo: Add the Types everywhere in the codebase

// ToDo: Cleanup the console.log statements from everywhere & remove this below window object
// Declare the global variable
declare global {
  interface Window {
    renderCount: number;
  }
}

// Set the initial value
window.renderCount = 0;

// Access it anywhere in your code
console.log("Render count in src/index.tsx: ", window.renderCount++);

// ToDo: Wrap RouterProvider inside React.StrictMode wrapper & Fix the twice re-render issue while getting the code from `api/github/auth` step
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
