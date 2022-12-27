import { useSelector } from "react-redux";
import { Avatar } from "../../components/Avatar";
import { Tile } from "../../components/Tile";
import { getUser } from "../../state/UserSlice";
import { styled } from "@mui/material/styles";
import { Button } from "../../components/Button";

const StyledNavDiv = styled("div")`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const StyledDiv = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

export const AccountPage = () => {
  const user = useSelector(getUser);

  return (
    <Tile width={800}>
      <StyledNavDiv>
        <Avatar size={85} color={user.color} children={user.username} />
        <StyledDiv>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <p>{user.email}</p>
        </StyledDiv>
        <Button name="edit" type="button" />
        <Button name="delete" type="button" />
      </StyledNavDiv>
    </Tile>
  );
};
