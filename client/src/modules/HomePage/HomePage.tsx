import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { getUser, saveUserData } from "../../state/UserSlice";
import { getUserData } from "../../utils";
import { LoadingPage } from "../LoadingPage";

export const HomePage = () => {
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id === undefined) {
      getUserData()
        .then((res) => {
          dispatch(saveUserData(res.data.userData));
          setLoading(false);
        })
        .catch((err) => navigate("/login"));
    } else setLoading(false);
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
