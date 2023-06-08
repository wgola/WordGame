import { useAppDispatch, useAppSelector } from "../../../hooks";
import { clearGame, isHost } from "../../../state/GameSlice";
import { deleteGame } from "../../../api/gameAPI/deleteGame";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonDiv } from "../../ButtonDiv";
import { Button } from "../../Button";
import { Tile } from "../../Tile";
import { useEffect } from "react";
import socket from "../../../ws";

export const ButtonsTile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameID } = useParams();
  const isPlayerHost = useAppSelector(isHost);

  const onExit = () => {
    socket.disconnect();
    dispatch(clearGame());
    navigate("/home/play");
  };

  const onDelete = () => {
    socket.emit(
      "info",
      "Host deleted this game! You will be redirected to home page in 5 seconds..."
    );
    socket.emit("deleted", "game deleted");
  };

  const onGameDeleted = (payload: string) => {
    setTimeout(async () => {
      try {
        await deleteGame(gameID);
      } finally {
        socket.disconnect();
        navigate("/home/play");
        dispatch(clearGame());
      }
    }, 5000);
  };

  useEffect(() => {
    socket.on("deleted", onGameDeleted);

    return () => {
      socket.off("deleted", onGameDeleted);
    };
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
