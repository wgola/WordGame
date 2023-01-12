import { getCurrentPlayer, getPlayers } from "../../state/GameSlice";
import { Avatar } from "../Avatar";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../hooks";

const UserDiv = styled("div")`
  border-radius: 15px;
  border: 1px solid grey;
  padding: 5px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface CurrentTurnProps {
  visible: boolean;
}

const CurrentTurn = styled("div", {
  shouldForwardProp: (prop) => prop !== "visible",
})<CurrentTurnProps>`
  margin-left: 10px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: green;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

export const GameScoreTile = () => {
  const { host, opponent } = useAppSelector(getPlayers);
  const currentPlayer = useAppSelector(getCurrentPlayer);

  return (
    <Tile dontAddMargin={true}>
      <UserDiv>
        <CurrentTurn visible={currentPlayer?.userID === host.userID} />
        <Avatar size={30} color={host.color} children={host.username} />
        <span style={{ width: 100 }}>{host.username}</span>
        <span>Score: {host.score}</span>
      </UserDiv>
      <UserDiv>
        <CurrentTurn visible={currentPlayer?.userID === opponent.userID} />
        {opponent.userID !== "" ? (
          <>
            <Avatar
              size={30}
              color={opponent.color}
              children={opponent.username}
            />
            <span style={{ width: 100 }}>{opponent.username}</span>
            <span>Score: {opponent.score}</span>
          </>
        ) : (
          <span>Waiting for opponent...</span>
        )}
      </UserDiv>
    </Tile>
  );
};
