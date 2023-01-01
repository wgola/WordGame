import { useParams } from "react-router-dom";

export const GamePage = () => {
  const { gameID } = useParams();

  return <p>{gameID}</p>;
};
