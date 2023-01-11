import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../../api";
import { GameChat, Tile } from "../../components";
import { GameScoreTile } from "../../components/GameScoreTile";
import {
  addOpponent,
  getGameData,
  saveGame,
  saveGeneratedGame,
} from "../../state/GameSlice";
import { getUser, saveUserData } from "../../state/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import mqttConnect from "../../mqtt";
import { OnMessageCallback } from "precompiled-mqtt";
import { GameBoard } from "../../components/GameBoard";
import { LettersTile } from "../../components/LettersTile";
import { ButtonsTile } from "../../components/ButtonsTile";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { gameID } = useParams();
  const user = useAppSelector(getUser);
  const game = useAppSelector(getGameData);

  const methods: {
    publish: (topic: string, message: string) => void;
    subscribe: (topic: string | Array<string>) => void;
    onMessage: (callback: OnMessageCallback) => void;
  } = mqttConnect();

  const connectedTopic = `game/${gameID}/connected`;
  const gameReadyTopic = `game/${gameID}/generatedGame`;

  const OnMessageCallback = (topic: string, payload: Buffer) => {
    const data = JSON.parse(payload.toString());
    if (topic === connectedTopic) {
      if (game.opponent.userID === "") dispatch(addOpponent(data));
    } else if (topic === gameReadyTopic) {
      dispatch(saveGeneratedGame(data));
    }
  };

  const onRender = async () => {
    if (user._id === undefined || game.gameID === "") {
      try {
        const {
          data: { userData, gameData },
        } = await getGame(gameID);
        dispatch(saveUserData(userData));
        methods.subscribe([connectedTopic, gameReadyTopic]);
        methods.onMessage(OnMessageCallback);
        if (gameData !== null) {
          dispatch(saveGame(gameData));
          if (gameData.opponent)
            methods.publish(
              `game/${gameID}/connected`,
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
          <Grid item xs={3}>
            <GameScoreTile />
          </Grid>
          <Grid item xs={6}>
            <GameChat {...methods} />
          </Grid>
          <Grid item xs={3}>
            <ButtonsTile />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
