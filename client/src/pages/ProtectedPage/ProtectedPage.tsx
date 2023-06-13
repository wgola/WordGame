import { getColorFromString } from "../../utils/getColorFromString";
import { getUser, saveUserData } from "../../state/UserSlice";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";

export const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const user = useSelector(getUser);

  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        navigate("/");
      } else if (user.id === undefined) {
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
  }, [initialized]);

  return loading ? <LoadingPage /> : <>{children}</>;
};
