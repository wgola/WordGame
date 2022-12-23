import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Tile } from "../Tile";

const StyledDiv = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Tile width={1200}>
      <StyledDiv>
        <Button name="play" type="button" onClick={() => navigate("/home")} />
        <Button
          name="account"
          type="button"
          onClick={() => navigate("/home")}
        />
        <Button
          name="words list"
          type="button"
          onClick={() => navigate("/home")}
        />
        <Button name="logout" type="button" onClick={() => navigate("/home")} />
      </StyledDiv>
    </Tile>
  );
};
