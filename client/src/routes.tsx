import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import {
  AccountPage,
  GamePage,
  HomePage,
  PlayPage,
  WordsListPage,
  ProtectedPage,
} from "./pages";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
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
    ],
  },
  {
    path: "/game/:gameID",
    element: (
      <ProtectedPage>
        <GamePage />
      </ProtectedPage>
    ),
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
