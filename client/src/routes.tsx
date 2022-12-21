import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./modules/LoginPage";
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
    path: "/",
    element: <App />,
  },
];

export default createBrowserRouter(routes);
