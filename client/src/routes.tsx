import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { AccountPage } from "./pages/AccountPage";
import { EditAccountPage } from "./pages/EditAccountPage";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PlayPage } from "./pages/PlayPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WordsListPage } from "./pages/WordsListPage";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        path: "/home/play",
        element: <PlayPage />,
      },
      {
        path: "/home/wordslist",
        element: <WordsListPage />,
      },
      {
        path: "/home/account",
        element: <AccountPage />,
      },
      {
        path: "/home/account/edit",
        element: <EditAccountPage />,
      },
    ],
  },
  {
    path: "/game/:gameID",
    element: <GamePage />,
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
