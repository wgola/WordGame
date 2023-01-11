import { useAppSelector } from "../../hooks";
import { getGameLoading, getGuessedWords } from "../../state/GameSlice";
import { BoardWord } from "../BoardWord";
import { Tile } from "../Tile";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const StlyedBoardDiv = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 7.5px;
`;

const StyledTitle = styled("p")`
  padding: 0;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const GameBoard = () => {
  const isGameLoading = useAppSelector(getGameLoading);

  const wordsData = useAppSelector(getGuessedWords);

  const { gameID } = useParams();

  const boardWords = wordsData.map((word) => <BoardWord boardWord={word} />);

  return (
    <Tile dontAddMargin={true} height={610}>
      <StyledTitle>
        {isGameLoading ? "Game is loading..." : `Welcome to game ${gameID}!`}
      </StyledTitle>
      <StlyedBoardDiv>{...boardWords}</StlyedBoardDiv>
    </Tile>
  );
};
