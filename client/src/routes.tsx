import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { AccountPage } from "./pages/AccountPage";
import { GamePage } from "./pages/GamePage";
import { HomePage } from "./pages/HomePage";
import { PlayPage } from "./pages/PlayPage";
import { WordsListPage } from "./pages/WordsListPage";
import { ProtectedPage } from "./pages/ProtectedPage";

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
    element: <GamePage />,
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
