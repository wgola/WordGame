import { Tile } from "../../components/Tile";
import { RegsiterForm } from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <Tile width={500}>
      <h1>Register</h1>
      <RegsiterForm />
    </Tile>
  );
};
