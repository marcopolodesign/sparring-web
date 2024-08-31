import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./routes/log-in"
import Torneo from "./routes/torneo"
import Partidos from "./routes/partidos"
import Tabla from "./routes/tabla"
import ProtectedRoute from "./components/ProtectedRoute";
import Container from "./components/fuba/Container";
import TournamentHome from './components/Home'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const user = JSON.parse(localStorage.getItem('user'))


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
    path: "/fupa",
    element:  (
      <ProtectedRoute>
        <Container />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        index: true,
        element: <TournamentHome />,
      },
      {
        path: "torneo",
        element: <Torneo  user={user}/>,
      },
      {
        path: "tabla",
        element: <Tabla />,
      },
      {
        path: "partidos",
        element: <Partidos />,
      },
    ],
  },

  // {
  //   path: "/torneo",
  //   element: <Torneo />,
  // },

  // {
  //   path: "/tabla",
  //   element: <Tabla />,
  // },

  // {
  //   path: "/partidos",
  //   element: <Partidos />,
  // },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);