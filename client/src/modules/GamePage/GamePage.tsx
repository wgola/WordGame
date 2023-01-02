import { useNavigate, useParams } from "react-router-dom";
import { getGame } from "../../api";

export const GamePage = () => {
  const navigate = useNavigate();

  const { gameID } = useParams();

  getGame(gameID).then((res) => {
    if (res.data === null) navigate("/home/play");
  });

  return <p>{gameID}</p>;
};
