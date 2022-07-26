import { useAuth } from "../../context/authContext";
import { useCurrentUser } from "../../hooks/getCurrentUser";
import { Link } from "react-router-dom";

const YourProfile = () => {
  const { user } = useAuth();
  const [currentUser] = useCurrentUser(user);
  return (
    <div>
      <div className="flex gap-3 items-center">
        <Link to={`/profile/${currentUser?.username}`}>
          <img
            src={
              currentUser?.userPhoto
                ? currentUser?.userPhoto
                : require("../../images/user.png")
            }
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover max-w-none"
            loading="lazy"
          />
        </Link>
        <div>
          <p className="font-bold text-2xl">{currentUser?.username}</p>
          <p className="text-xl">{currentUser?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
