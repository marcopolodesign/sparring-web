import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./routes/log-in"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/inicio",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);