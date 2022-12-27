import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { HomePage } from "./modules/HomePage";
import { LoginPage } from "./modules/LoginPage";
import { PlayPage } from "./modules/PlayPage";
import { RegisterPage } from "./modules/RegisterPage";

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
    ],
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
