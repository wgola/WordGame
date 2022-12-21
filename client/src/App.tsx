import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Tile } from "./components/Tile";
import { ButtonDiv } from "./components/ButtonDiv";

const App = () => {
  const navigate = useNavigate();

  return (
    <Tile width={500}>
      <Form>
        <h1>Welcome to ScrabbleApp!</h1>
        <ButtonDiv>
          <Button
            type="button"
            name="Log in"
            onClick={() => navigate("/login")}
          />
          or
          <Button
            type="button"
            name="Create account"
            onClick={() => navigate("/register")}
          />
        </ButtonDiv>
      </Form>
    </Tile>
  );
};
export default App;
