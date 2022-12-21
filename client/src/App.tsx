import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const App = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <h1>Welcome to ScrabbleApp!</h1>
      <StyledDiv>
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
      </StyledDiv>
    </Form>
  );
};
export default App;
