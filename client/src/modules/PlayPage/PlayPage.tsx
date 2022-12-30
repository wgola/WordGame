import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Tile, Input } from "../../components";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 35px;
`;

export const PlayPage = () => {
  const navigate = useNavigate();

  const [gameID, setGameID] = useState("");

  return (
    <Tile width={900}>
      <StyledDiv>
        <Button
          children="Create new game"
          type="button"
          onClick={() => navigate("/game/0")}
        />
        or
        <div>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGameID(event.target.value)
            }
            required={true}
            label="Enter game ID"
          />
          <Button
            children="Join game"
            type="button"
            onClick={() => navigate(`/game/${gameID}`)}
          />
        </div>
      </StyledDiv>
    </Tile>
  );
};
