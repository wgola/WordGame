import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../../api";
import { Tile } from "../../components";
import { GameScoreTile } from "../../components/GameScoreTile";
import { getGameData, saveGame } from "../../state/GameSlice";
import { getUser, saveUserData } from "../../state/UserSlice";
import mqtt from "precompiled-mqtt";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const client = mqtt.connect("ws://localhost:9000/mqtt");
  const { gameID } = useParams();
  const user = useAppSelector(getUser);
  const game = useAppSelector(getGameData);

  const isSecondRender = useRef(false);
  useEffect(() => {
    if (isSecondRender) {
      if (user._id === undefined || game.gameID === "") {
        getGame(gameID)
          .then((res) => {
            if (res.data.userData !== null) {
              dispatch(saveUserData(res.data.userData));
            } else navigate("/login");
            if (res.data.gameData !== null) {
              dispatch(saveGame(res.data.gameData));
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
        <Grid container direction="column" justifyContent="flex-start">
          <Grid item xs={1}>
            <GameScoreTile client={client} />
          </Grid>
          <Grid item xs={1}>
            <Tile>Chat tile</Tile>
          </Grid>
          <Grid item xs={1}>
            <Tile>Letters tile</Tile>
          </Grid>
          <Grid item xs={1}>
            <Tile>Button tile</Tile>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
