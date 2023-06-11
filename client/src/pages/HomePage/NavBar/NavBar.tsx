import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Tile } from "../../../components";
import { useKeycloak } from "@react-keycloak/web";

const StyledDiv = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const navigate = useNavigate();

  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(false);

  return (
    <Tile width={1200}>
      <StyledDiv>
        <Button
          children="play"
          type="button"
          onClick={() => navigate("/home/play")}
          disabled={loading}
        />
        <Button
          children="account"
          type="button"
          onClick={() => navigate("/home/account")}
          disabled={loading}
        />
        <Button
          children="words list"
          type="button"
          onClick={() => navigate("/home/wordslist/?page=1&limit=10&word=")}
          disabled={loading}
        />
        <Button
          children="logout"
          type="button"
          deleteButton={true}
          onClick={() =>
            keycloak.logout({ redirectUri: "http://localhost:5173" })
          }
          disabled={loading}
        />
      </StyledDiv>
    </Tile>
  );
};
