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
import Leaderboard from './routes/Leaderboard'
import CopaOro from './routes/copa-oro'
import CopaPlata from './routes/copa-plata'
import PublicTournament from './routes/torneo-public'
import Ranking from './components/fuba/Ranking'
import PublicKnockout from './routes/knockout-public'
import Partido from './routes/partido'
import Privacy from './routes/privacy'

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

  {
    path: "/ft",
    element: <Torneo user={user} />,
  },

  {
    path: "/oro",
    element: <CopaOro />,
  },

  {
    path: "/plata",
    element: <CopaPlata />,
  },

  {
    path: "/leaderboard",
    element: <Leaderboard isLeaderBoard/>,
  }, 

  {
    path: 'ranking', 
    element: <Ranking isIndividual />,
  }, 
  

  {
    path: 'torneos/grupos', 
    element: <PublicTournament />,
  }, 

  {
    path: 'torneos/eliminacion', 
    element: <PublicKnockout />,
  }, 
  
  {
    path: "/partido",
    element: <Partido />,
  },

  {
    path: "/privacy",
    element: <Privacy />,
  },



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