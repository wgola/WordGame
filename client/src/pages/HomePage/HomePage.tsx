import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
