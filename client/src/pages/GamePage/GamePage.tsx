import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { getGame } from "../../api";
import { useEffect } from "react";
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
  const game = useAppSelector(getGameData);

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
    if (game.gameID === "") {
      socket.connect();
      try {
        const {
          data: { gameData },
        } = await getGame(gameID);

        socket.emit("join-game", gameID);

        if (gameData !== null) {
          dispatch(saveGame(gameData));
          if (gameData.opponent)
            socket.emit("connected", JSON.stringify(gameData.opponent));
        } else {
          socket.disconnect();
          navigate("/home/play");
        }
      } catch {
        socket.disconnect();
        navigate("/home/play");
      }
    }
  };

  useEffect(() => {
    onRender();
    socket.on("connected", onConnected);
    socket.on("generatedGame", onGameReady);
    socket.on("changeTurn", onChangeTurn);

    return () => {
      socket.off("connected", onConnected);
      socket.off("generatedGame", onGameReady);
      socket.off("changeTurn", onChangeTurn);
    };
  });

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
