import { clearGame, getGameData, isHost } from "../../../state/GameSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteGame } from "../../../api/gameAPI/deleteGame";
import { MqttMethods } from "../../../types/mqttMethods";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDiv } from "../ButtonDiv";
import { Button } from "../../Button";
import { Tile } from "../../Tile";
import { useEffect, useRef } from "react";

export const ButtonsTile = ({ publish, subscribe, onMessage }: MqttMethods) => {
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
    publish(
      `/game/${gameID}/info`,
      "Host deleted this game! You will be redirected to home page in 5 seconds..."
    );
    publish(gameDeletedTopic, "game deleted");
  };

  const onGameDeleted = (topic: string, payload: Buffer) => {
    if (topic === gameDeletedTopic) {
      setTimeout(async () => {
        try {
          await deleteGame(gameID);
        } finally {
          navigate("/home/play");
          dispatch(clearGame());
        }
      }, 5000);
    }
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      subscribe(gameDeletedTopic);
      onMessage(onGameDeleted);
    }
    isSecondRender.current = true;
  }, []);

  return (
    <Tile dontAddMargin={true}>
      <ButtonDiv>
        <Button children={"Exit"} onClick={onExit} />
        <Button
          children={"Delete game"}
          onClick={onDelete}
          disabled={!isPlayerHost}
        />
      </ButtonDiv>
    </Tile>
  );
};
