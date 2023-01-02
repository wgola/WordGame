import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../../api";
import { Tile } from "../../components";
import { getGameData, saveGame } from "../../state/GameSlice";
import { getUser, saveUserData } from "../../state/UserSlice";

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gameID } = useParams();
  const user = useSelector(getUser);
  const game = useSelector(getGameData);

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
            <Tile>Game score tile</Tile>
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
