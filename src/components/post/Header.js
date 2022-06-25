import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    <div>
      <Link to={`/profile/${username}`}>{username}</Link>
    </div>
  );
};
