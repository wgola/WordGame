import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserData } from "../../state/UserSlice";
import { logout } from "../../utils";
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

  const dispatch = useDispatch();

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
            await logout();
            dispatch(deleteUserData());
            navigate("/login");
          }}
          disabled={loading}
        />
      </StyledDiv>
    </Tile>
  );
};
