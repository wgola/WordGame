import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Tile } from "../../../components";
import { useKeycloak } from "@react-keycloak/web";
import { useAppDispatch } from "../../../hooks";
import { useEffect } from "react";
import { clearData } from "../../../state/WordsSlice";

const StyledDiv = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (window.location.pathname !== "/home/wordslist/") dispatch(clearData());
  }, [window.location.pathname]);

  return (
    <Tile width={1200}>
      <StyledDiv>
        <Button
          children="play"
          type="button"
          onClick={() => navigate("/home/play")}
        />
        <Button
          children="account"
          type="button"
          onClick={() => navigate("/home/account")}
        />
        <Button
          children="words list"
          type="button"
          onClick={() => navigate("/home/wordslist/?page=1&limit=10&word=")}
        />
        <Button
          children="logout"
          type="button"
          deleteButton={true}
          onClick={() =>
            keycloak.logout({ redirectUri: window.location.origin })
          }
        />
      </StyledDiv>
    </Tile>
  );
};
