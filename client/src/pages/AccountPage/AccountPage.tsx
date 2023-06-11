import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Avatar, Tile, Button } from "../../components";
import { getUser } from "../../state/UserSlice";
import { useKeycloak } from "@react-keycloak/web";

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
  const { keycloak } = useKeycloak();
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
          children="manage account"
          type="button"
          onClick={() => keycloak.accountManagement()}
        />
      </StyledNavDiv>
    </Tile>
  );
};
