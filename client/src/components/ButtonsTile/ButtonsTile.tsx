import { useNavigate } from "react-router-dom";
import { deleteGame } from "../../api/gameAPI/deleteGame";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearGame, getGameData, isHost } from "../../state/GameSlice";
import { Button } from "../Button/Button";
import { ButtonDiv } from "../ButtonDiv";
import { Tile } from "../Tile";

export const ButtonsTile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameID } = useAppSelector(getGameData);
  const isPlayerHost = useAppSelector(isHost);

  const onExit = () => {
    dispatch(clearGame());
    navigate("/home/play");
  };

  const onDelete = async () => {
    try {
      await deleteGame(gameID);
      dispatch(clearGame());
      navigate("/home/play");
    } catch (e) {
      console.log("You cant delete this game");
    }
  };

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
