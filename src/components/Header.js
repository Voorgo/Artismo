import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCurrentUser } from "../hooks/getCurrentUser";

const Header = () => {
  const { user, logOut } = useAuth();
  const [currentUser] = useCurrentUser(user);
  const navigate = useNavigate();

  return (
    <header>
      <div className="basis-[60px]"></div>
      <nav className="bg-white w-full border-b border-[rgb(219, 219, 219)] fixed top-0 left-0 z-20">
        <div className="container flex max-w-[950px] mx-auto justify-center text-2xl h-[60px] items-center px-8">
          <div className="mr-[20px]">
            <h1
              className="font-nosfier text-4xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              Artismo
            </h1>
          </div>
          {user?.email ? (
            <div className="flex items-center justify-end gap-8 grow ">
              <div onClick={() => navigate("/")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div onClick={logOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 cursor-pointer"
                  fill="none"
                  viewBox="0 0 23 23"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <Link to={`/profile/${currentUser?.username}`}>
                <img
                  src={
                    currentUser?.userPhoto
                      ? currentUser?.userPhoto
                      : require("../images/user.png")
                  }
                  alt="avatar"
                  className="w-12 h-12  rounded-full object-cover max-w-none"
                />
              </Link>
            </div>
          ) : (
            <div className="flex gap-5">
              <Link to="/login">
                <button className="bg-blue-500 text-white font-bold rounded-md px-4 py-2 active:bg-blue-300">
                  Log In
                </button>
              </Link>
              <Link to="/signup" className="flex">
                <button className="text-blue-500 font-bold active:text-blue-300">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
