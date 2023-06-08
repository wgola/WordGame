import { getUser, saveUserData } from "../../state/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
// import mqttConnect from "../../mqtt";
import { Grid } from "@mui/material";
import { getGame } from "../../api";
import {
  GameChat,
  GameScoreTile,
  GameBoard,
  LettersTile,
  ButtonsTile,
  GameMessageDiv,
} from "../../components";
import socket from "../../ws";
import {
  addOpponent,
  changeTurn,
  getGameData,
  saveGame,
  saveGeneratedGame,
} from "../../state/GameSlice";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { gameID } = useParams();
  const user = useAppSelector(getUser);
  const game = useAppSelector(getGameData);

  const connectedTopic = `/game/${gameID}/connected`;
  const gameReadyTopic = `/game/${gameID}/generatedGame`;
  const changeTurnTopic = `/game/${gameID}/changeTurn`;

  const onConnected = (payload: string) => {
    const data = JSON.parse(payload);
    if (game.opponent.userID === "") dispatch(addOpponent(data));
  };

  const onGameReady = (payload: string) => {
    const data = JSON.parse(payload);
    dispatch(saveGeneratedGame(data));
  };

  const onChangeTurn = (payload: string) => {
    const data = payload;
    dispatch(changeTurn(data));
  };

  const onRender = async () => {
    if (user._id === undefined || game.gameID === "") {
      try {
        const {
          data: { userData, gameData },
        } = await getGame(gameID);
        dispatch(saveUserData(userData));

        socket.emit("join-game", gameID);
        socket.on(connectedTopic, onConnected);
        socket.on(gameReadyTopic, onGameReady);
        socket.on(changeTurnTopic, onChangeTurn);

        if (gameData !== null) {
          dispatch(saveGame(gameData));
          if (gameData.opponent)
            socket.emit(
              `/game/${gameID}/connected`,
              JSON.stringify(gameData.opponent)
            );
        } else navigate("/home/play");
      } catch (e) {
        navigate("/login");
      }
    }
  };

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) onRender();
    isSecondRender.current = true;
  }, [user]);

  return (
    <Grid container spacing={2} margin={"40px auto"} width={"1300px"}>
      <Grid item xs={8}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          rowGap={2}
        >
          <Grid item xs={9}>
            <GameBoard />
          </Grid>
          <Grid item xs={3}>
            <LettersTile />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          rowGap={2}
        >
          <Grid item>
            <GameScoreTile />
          </Grid>
          <Grid item>
            <GameChat />
          </Grid>
          <Grid item>
            <GameMessageDiv />
          </Grid>
          <Grid item>
            <ButtonsTile />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
