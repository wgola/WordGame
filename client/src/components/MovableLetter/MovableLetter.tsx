import { useDrag } from "react-dnd";
import { styled } from "@mui/material/styles";
import { Letter } from "../../types/letter";
import { useAppSelector } from "../../hooks";
import { isPlayerTurn } from "../../state/GameSlice";

interface StyledDivProps {
  canDrag: boolean;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "canDrag",
})<StyledDivProps>`
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  margin: 7.5px;
  background-color: ${({ canDrag }) => (!canDrag ? "lightgrey" : "white")};
  font-weight: bold;
`;

interface MovableLetterProps {
  letter: Letter;
}

export const MovableLetter = ({ letter }: MovableLetterProps) => {
  const ifPlayerTurn = useAppSelector(isPlayerTurn);

  const [, drag] = useDrag({
    type: "letter",
    item: letter,
    canDrag: ifPlayerTurn,
  });

  return (
    <StyledDiv ref={drag} canDrag={ifPlayerTurn}>
      {letter.letter}
    </StyledDiv>
  );
};
