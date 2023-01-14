import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Tile } from "../../../components";
import { deleteUserData } from "../../../state/UserSlice";
import { logout } from "../../../api";

const StyledDiv = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          onClick={async () => {
            setLoading(true);
            await logout();
            dispatch(deleteUserData());
            navigate("/");
          }}
          disabled={loading}
        />
      </StyledDiv>
    </Tile>
  );
};
