import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tile } from "../../components";
import { RegsiterForm } from "./RegisterForm";
import { LoadingPage } from "../LoadingPage";
import { getUser, saveUserData } from "../../state/UserSlice";
import { getUserData } from "../../api";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const user = useSelector(getUser);

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      getUserData().then((user) => {
        if (user !== null) {
          dispatch(saveUserData(user));
          navigate("/home");
        }
        setLoading(false);
      });
    }
    isSecondRender.current = true;
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
