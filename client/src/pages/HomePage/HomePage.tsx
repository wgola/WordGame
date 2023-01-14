import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";
import { NavBar } from "./NavBar";
import { getUser, saveUserData } from "../../state/UserSlice";
import { getUserData } from "../../api";

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

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) onRender();
    isSecondRender.current = true;
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
