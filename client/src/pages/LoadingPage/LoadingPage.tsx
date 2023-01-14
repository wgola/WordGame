import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")`
  width: 100px;
  margin: 150px auto;
`;

export const LoadingPage = () => (
  <StyledDiv>
    <CircularProgress style={{ color: "#fffff0" }} />
  </StyledDiv>
);
