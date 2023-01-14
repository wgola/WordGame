import { getGameLoading, getGuessedWords } from "../../../state/GameSlice";
import { useAppSelector } from "../../../hooks";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { BoardWord } from "../BoardWord";
import { Tile } from "../../Tile";

const StyledDiv = styled("div")`
  border: 1px solid grey;
  border-radius: 15px;
`;

const StlyedBoardDiv = styled("div")`
  height: 467.5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 7.5px;
`;

const StyledTitle = styled("div")`
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid grey;
  border-radius: 15px;
`;

const StyledID = styled("span")`
  :hover {
    color: grey;
    cursor: pointer;
  }
`;

export const GameBoard = () => {
  const isGameLoading = useAppSelector(getGameLoading);

  const wordsData = useAppSelector(getGuessedWords);

  const { gameID } = useParams();

  const boardWords = wordsData.map((word) => <BoardWord boardWord={word} />);

  return (
    <Tile dontAddMargin={true}>
      <StyledDiv>
        <StyledTitle>
          {isGameLoading ? (
            <span>Game is loading...</span>
          ) : (
            <span>
              Welcome to game #
              <StyledID
                onClick={() => navigator.clipboard.writeText(gameID || "")}
              >
                {gameID}
              </StyledID>
              !
            </span>
          )}
        </StyledTitle>
        <StlyedBoardDiv>{...boardWords}</StlyedBoardDiv>
      </StyledDiv>
    </Tile>
  );
};
