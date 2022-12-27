import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";
import { Button } from "../Button";
import { Tile } from "../Tile";

const StyledDiv = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Tile width={1200}>
      <StyledDiv>
        <Button
          name="play"
          type="button"
          onClick={() => navigate("/home/play")}
          disabled={loading}
        />
        <Button
          name="account"
          type="button"
          onClick={() => navigate("/home")}
          disabled={loading}
        />
        <Button
          name="words list"
          type="button"
          onClick={() => navigate("/home")}
          disabled={loading}
        />
        <Button
          name="logout"
          type="button"
          onClick={async () => {
            setLoading(true);
            (await logout()) ? navigate("/login") : navigate("/home");
          }}
          disabled={loading}
        />
      </StyledDiv>
    </Tile>
  );
};
