import { getColorFromString } from "../../utils/getColorFromString";
import { getUser, saveUserData } from "../../state/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { LoadingPage } from "../LoadingPage";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const { keycloak, initialized } = useKeycloak();
  const user = useSelector(getUser);

  const onRender = async () => {
    if (initialized) {
      if (!keycloak.authenticated) {
        navigate("/");
      }
      if (user.id === undefined) {
        const { preferred_username, sub, email } = keycloak.tokenParsed || {};
        const color = getColorFromString(preferred_username);
        dispatch(
          saveUserData({
            id: sub || "",
            email: email,
            username: preferred_username,
            color: color,
          })
        );
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    onRender();
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
