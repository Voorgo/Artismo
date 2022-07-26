import { Link } from "react-router-dom";
import { getUserProfile } from "../../utils/getUser";
import { useState, useEffect } from "react";

const Header = ({ username }) => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile(username, setUserProfile, setLoading);
  }, []);

  if (loading) return null;
  return (
    <div className="flex items-center gap-5 p-5 text-xl font-bold border-b rounded-xl border-gray-300">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        {userProfile?.userPhoto ? (
          <img
            src={userProfile?.userPhoto}
            alt="user avatar"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <Link to={`/profile/${username}`}>{username}</Link>
    </div>
  );
};

export default Header;
