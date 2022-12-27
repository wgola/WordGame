import { Button } from "../../components/Button";
import { IDInput } from "../../components/IDInput";
import { Tile } from "../../components/Tile";
import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 35px;
`;

export const PlayPage = () => {
  return (
    <Tile width={900}>
      <StyledDiv>
        <Button name="Create new game" type="button" />
        or
        <div>
          <IDInput />
          <Button name="Join game" type="button" />
        </div>
      </StyledDiv>
    </Tile>
  );
};
