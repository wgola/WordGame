import { useAppSelector } from "../../hooks";
import { getGameLoading, getGuessedWords } from "../../state/GameSlice";
import { BoardWord } from "../BoardWord";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";

const StlyedBoardDiv = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 7.5px;
`;

export const GameBoard = () => {
  const isGameLoading = useAppSelector(getGameLoading);

  const wordsData = useAppSelector(getGuessedWords);

  const boardWords = wordsData.map((word) => <BoardWord boardWord={word} />);

  return (
    <Tile dontAddMargin={true} height={570}>
      {isGameLoading ? "Game is loading..." : "BOARD TILE"}
      <StlyedBoardDiv>{...boardWords}</StlyedBoardDiv>
    </Tile>
  );
};
