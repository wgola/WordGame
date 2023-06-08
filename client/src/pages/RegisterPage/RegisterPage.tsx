import { getUser, saveUserData } from "../../state/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegsiterForm } from "./RegisterForm";
import { LoadingPage } from "../LoadingPage";
import { useEffect, useState } from "react";
import { Tile } from "../../components";
import { getUserData } from "../../api";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const user = useSelector(getUser);

  const onRender = async () => {
    try {
      const user = await getUserData();
      if (user !== null) {
        dispatch(saveUserData(user));
        navigate("/home/play");
      }
      setLoading(false);
    } catch (e) {
      navigate("/");
    }
  };

  useEffect(() => {
    onRender();
  }, [user]);

  return loading ? (
    <LoadingPage />
  ) : (
    <Tile width={500}>
      <h1>Register</h1>
      <RegsiterForm />
    </Tile>
  );
};
