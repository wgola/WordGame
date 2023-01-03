import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../../api";
import { GameChat, Tile } from "../../components";
import { GameScoreTile } from "../../components/GameScoreTile";
import { getGameData, saveGame } from "../../state/GameSlice";
import { getUser, saveUserData } from "../../state/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import mqttConnect from "../../mqtt";
import { OnMessageCallback } from "precompiled-mqtt";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { gameID } = useParams();
  const user = useAppSelector(getUser);
  const game = useAppSelector(getGameData);

  const [methods, setMethods] = useState<{
    publish: (topic: string, message: string) => void;
    subscribe: (topic: string) => void;
    onMessage: (callback: OnMessageCallback) => void;
  }>(mqttConnect(`game/${gameID}/connected`));

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender.current) {
      if (user._id === undefined || game.gameID === "") {
        getGame(gameID)
          .then((res) => {
            dispatch(saveUserData(res.data.userData));
            if (res.data.gameData !== null) {
              dispatch(saveGame(res.data.gameData));
              if (res.data.gameData.opponent)
                methods.publish(
                  `game/${gameID}/connected`,
                  JSON.stringify(res.data.gameData.opponent)
                );
            } else navigate("/home/play");
          })
          .catch((err) => navigate("/login"));
      }
    }
    isSecondRender.current = true;
  }, [user]);

  return (
    <Grid container spacing={2} margin={"auto"} width={"1300px"}>
      <Grid item xs={8}>
        <Tile>BOARD TILE</Tile>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          height={"1300px"}
          rowGap={0}
        >
          <Grid item xs={3}>
            <GameScoreTile />
          </Grid>
          <Grid item xs={3}>
            <GameChat {...methods} />
          </Grid>
          <Grid item xs={3}>
            <Tile>Letters tile</Tile>
          </Grid>
          <Grid item xs={3}>
            <Tile>Button tile</Tile>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
