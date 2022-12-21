import { Tile } from "../../components/Tile";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <Tile width={500}>
      <h1>Login</h1>
      <LoginForm />
    </Tile>
  );
};
