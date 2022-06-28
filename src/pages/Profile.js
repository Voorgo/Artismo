import { useAuth } from "../context/authContext";
import { useCurrentUser } from "../hooks/getCurrentUser";

const Profile = () => {
  const { user } = useAuth();
  const [currentUser] = useCurrentUser(user);

  return <div>{currentUser.username}</div>;
};

export default Profile;
