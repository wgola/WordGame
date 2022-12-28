import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../../components/Avatar";
import { Tile } from "../../components/Tile";
import { deleteUserData, getUser } from "../../state/UserSlice";
import { styled } from "@mui/material/styles";
import { Button } from "../../components/Button";
import { deleteAccount } from "../../utils";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  return (
    <Tile width={900}>
      <StyledNavDiv>
        <Avatar size={85} color={user.color} children={user.username} />
        <StyledDiv>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <p>{user.email}</p>
        </StyledDiv>
        <Button
          name="edit"
          type="button"
          onClick={() => navigate("/home/account/edit")}
        />
        or
        <Button
          name="delete account"
          type="button"
          onClick={async () => {
            const result = await deleteAccount();
            if (result) {
              dispatch(deleteUserData());
              navigate("/login");
            } else {
              navigate("/home/account");
            }
          }}
        />
      </StyledNavDiv>
    </Tile>
  );
};
