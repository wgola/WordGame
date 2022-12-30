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

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender) {
      if (user._id === undefined) {
        getUserData().then((user) => {
          if (user !== null) {
            dispatch(saveUserData(user));
            setLoading(false);
          } else navigate("/login");
        });
      }
      setLoading(false);
    }
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
