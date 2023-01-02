import { MqttClient } from "precompiled-mqtt";
import { useSelector } from "react-redux";
import { getPlayers } from "../../state/GameSlice";
import { Avatar } from "../Avatar";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";

interface GameScoreTileProps {
  client: MqttClient;
}

const UserDiv = styled("div")`
  border-radius: 15px;
  border: 1px solid grey;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  gap: 15px;
  align-items: center;
`;

export const GameScoreTile = ({ client }: GameScoreTileProps) => {
  const { host, opponent } = useSelector(getPlayers);

  return (
    <Tile>
      <UserDiv>
        <Avatar size={30} color={host.color} children={host.username} />
        <span>{host.username}</span>
        <span>Score: {host.score}</span>
      </UserDiv>
      <UserDiv>
        {opponent.userID !== "" ? (
          <>
            <Avatar
              size={30}
              color={opponent.color}
              children={opponent.username}
            />
            <span>{opponent.username}</span>
            <span>Score: {opponent.score}</span>
          </>
        ) : (
          <span>Waiting for opponent...</span>
        )}
      </UserDiv>
    </Tile>
  );
};
