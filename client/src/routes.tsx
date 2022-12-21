import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./modules/LoginPage";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
