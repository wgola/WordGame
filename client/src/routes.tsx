import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { AccountPage } from "./modules/AccountPage";
import { EditAccountPage } from "./modules/EditAccountPage";
import { HomePage } from "./modules/HomePage";
import { LoginPage } from "./modules/LoginPage";
import { PlayPage } from "./modules/PlayPage";
import { RegisterPage } from "./modules/RegisterPage";
import { WordsListPage } from "./modules/WordsListPage";

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
    element: <p>Game page</p>,
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
