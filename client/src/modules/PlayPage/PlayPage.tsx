import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Tile } from "../../components";
import { JoinGameForm } from "./JoinGameForm";
import { createGame } from "../../api";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 35px;
`;

export const PlayPage = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const onCreateGame = async () => {
    setMessage("Loading...");
    const result = await createGame();
    navigate(`/game/${result.data}`);
  };

  return (
    <Tile width={900}>
      <StyledDiv>
        <Button
          children="Create new game"
          type="button"
          onClick={onCreateGame}
        />
        or
        <JoinGameForm setMessage={setMessage} />
      </StyledDiv>
      <p>{message}</p>
    </Tile>
  );
};
