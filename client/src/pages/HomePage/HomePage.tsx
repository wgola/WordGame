import { getUser, saveUserData } from "../../state/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";
import { useEffect, useState } from "react";
import { getUserData } from "../../api";
import { NavBar } from "./NavBar";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const user = useSelector(getUser);

  const onRender = async () => {
    if (user._id === undefined) {
      try {
        const user = await getUserData();
        if (user !== null) {
          dispatch(saveUserData(user));
          setLoading(false);
        } else navigate("/login");
      } catch (e) {
        navigate("/login");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    onRender();
  }, [user]);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
