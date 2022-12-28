import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tile } from "../../components/Tile";
import { getUser, saveUserData } from "../../state/UserSlice";
import { getUserData } from "../../utils";
import { LoadingPage } from "../LoadingPage";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const user = useSelector(getUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData()
      .then((res) => {
        dispatch(saveUserData(res.data.userData));
        navigate("/home");
      })
      .catch((err) => setLoading(false));
  }, [user]);

  return loading ? (
    <LoadingPage />
  ) : (
    <Tile width={500}>
      <h1>Login</h1>
      <LoginForm />
    </Tile>
  );
};
