import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    <div className="flex items-center gap-5 p-5 text-xl font-bold border-b rounded-xl border-gray-300">
      <div className="w-12 h-12 bg-black rounded-full"></div>
      <Link to={`/profile/${username}`}>{username}</Link>
    </div>
  );
};

export default Header;
