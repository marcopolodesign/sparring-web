import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./routes/log-in"
import Torneo from "./routes/torneo"
import Partidos from "./routes/partidos"


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

  {
    path: "/torneo",
    element: <Torneo />,
  },

  {
    path: "/partidos",
    element: <Partidos />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);