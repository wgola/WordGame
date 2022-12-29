import { Button, Form, Tile, ButtonDiv } from "./components";
import { useNavigate } from "react-router-dom";

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
