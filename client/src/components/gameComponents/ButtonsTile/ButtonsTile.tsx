import { clearGame, getGameData, isHost } from "../../../state/GameSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteGame } from "../../../api/gameAPI/deleteGame";
import { MqttMethods } from "../../../types/mqttMethods";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDiv } from "../../ButtonDiv";
import { Button } from "../../Button";
import { Tile } from "../../Tile";
import { useEffect, useRef } from "react";
import socket from "../../../ws";

export const ButtonsTile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameID } = useParams();
  const isPlayerHost = useAppSelector(isHost);

  const gameDeletedTopic = `/game/${gameID}/deleted`;

  const onExit = () => {
    dispatch(clearGame());
    navigate("/home/play");
  };

  const onDelete = () => {
    socket.emit(
      `/game/${gameID}/info`,
      "Host deleted this game! You will be redirected to home page in 5 seconds..."
    );
    socket.emit(gameDeletedTopic, "game deleted");
  };

  const onGameDeleted = (payload: string) => {
    setTimeout(async () => {
      try {
        await deleteGame(gameID);
      } finally {
        navigate("/home/play");
        dispatch(clearGame());
      }
    }, 5000);
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      socket.on(gameDeletedTopic, onGameDeleted);
    }
    isSecondRender.current = true;
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <ButtonDiv>
        <Button children={"Exit"} onClick={onExit} />
        <Button
          children={"Delete game"}
          deleteButton={true}
          onClick={onDelete}
          disabled={!isPlayerHost}
        />
      </ButtonDiv>
    </Tile>
  );
};
