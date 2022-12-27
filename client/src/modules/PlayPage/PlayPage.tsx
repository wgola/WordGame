import { Button } from "../../components/Button";
import { IDInput } from "../../components/IDInput";
import { Tile } from "../../components/Tile";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

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
          name="Create new game"
          type="button"
          onClick={() => navigate("/game/0")}
        />
        or
        <div>
          <IDInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setGameID(event.target.value)
            }
          />
          <Button
            name="Join game"
            type="button"
            onClick={() => navigate(`/game/${gameID}`)}
          />
        </div>
      </StyledDiv>
    </Tile>
  );
};
