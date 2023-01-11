import { useDrag } from "react-dnd";
import { styled } from "@mui/material/styles";
import { Letter } from "../../types/letter";

interface StyledDivProps {
  isDragging: boolean;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<StyledDivProps>`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  margin: 7.5px;
  background-color: ${({ isDragging }) => (isDragging ? "grey" : "white")};
  font-weight: bold;
`;

interface MovableLetterProps {
  letter: Letter;
}

export const MovableLetter = ({ letter }: MovableLetterProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "letter",
    item: letter,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <StyledDiv ref={drag} isDragging={isDragging}>
      {letter.letter}
    </StyledDiv>
  );
};
