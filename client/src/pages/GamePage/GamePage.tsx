import { getUser, saveUserData } from "../../state/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
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

import {
  addOpponent,
  changeTurn,
  getGameData,
  saveGame,
  saveGeneratedGame,
} from "../../state/GameSlice";

const socket = io("http://localhost:8000");

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { gameID } = useParams();
  const user = useAppSelector(getUser);
  const game = useAppSelector(getGameData);

  const onRender = async () => {
    if (user._id === undefined || game.gameID === "") {
      try {
        const {
          data: { userData, gameData },
        } = await getGame(gameID);
        dispatch(saveUserData(userData));
        socket.on("connected", (payload) => {
          const data = JSON.parse(payload);
          if (game.opponent.userID === "") dispatch(addOpponent(data));
        });
        socket.on("generatedGame", (payload) => {
          const data = JSON.parse(payload);
          dispatch(saveGeneratedGame(data));
        });
        socket.on("changeTurn", (payload) => {
          dispatch(changeTurn(payload));
        });
        if (gameData !== null) {
          dispatch(saveGame(gameData));
          if (gameData.opponent)
            socket.emit("connected", JSON.stringify(gameData.opponent));
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
            <LettersTile socket={socket} />
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
            <GameChat socket={socket} />
          </Grid>
          <Grid item>
            <GameMessageDiv socket={socket} />
          </Grid>
          <Grid item>
            <ButtonsTile socket={socket} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
