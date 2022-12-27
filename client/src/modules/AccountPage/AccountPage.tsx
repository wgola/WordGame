import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../../components/Avatar";
import { getUser } from "../../state/UserSlice";

export const AccountPage = () => {
  const user = useSelector(getUser);

  return <Avatar size={100} color={user.color} children={user.username} />;
};
