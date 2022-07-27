import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login, demoLogin } = useAuth();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password, setError);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Artismo";
  }, []);

  return (
    <div className="container mx-auto flex items-center max-w-screen-md h-screen justify-center p-5">
      <div className="w-2/4 hidden md:flex">
        <img
          src={require("../images/iphone-with-app.jpg")}
          alt="app preview on phone"
        />
      </div>
      <div className="flex gap-4 flex-col max-w-lg w-full md:w-[45%] ">
        <div className="flex flex-col  xs:bg-white xs:px-8 xs:pb-10 xs:border xs:border-gray-primary xs:mb-4 xs:rounded">
          <h1 className="font-nosfier text-5xl text-center my-10">Artismo</h1>
          {error ? (
            <div className="text-center text-xl border border-red-500 py-3 mb-5 bg-red-500 text-white font-bold">
              {error}
            </div>
          ) : null}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <label className="relative w-full h-[42px] flex ">
              <span
                className={`absolute top-1/2  -translate-y-1/2 text-2xl  select-none pointer-events-none text-gray-500 origin-top-left ${
                  email ? "scale-75 top-1 left-8 -translate-y-0" : "left-8"
                }`}
              >
                Email address
              </span>
              <input
                onChange={handleEmail}
                type="email"
                aria-label="Enter email address"
                className={`outline-2 outline-blue-500 text-2xl p-5 overflow-ellipsis ${
                  email ? "pt-4 pl-7 pr-2 pb-0" : "pl-7"
                } border border-gray-400 rounded w-full`}
              />
            </label>

            <label className="relative w-full h-[42px] flex ">
              <span
                className={`absolute top-1/2  -translate-y-1/2 text-2xl overflow-ellipsis  select-none pointer-events-none text-gray-500 origin-top-left ${
                  password ? "scale-75 top-1 left-8 -translate-y-0" : "left-8"
                }`}
              >
                Password
              </span>
              <input
                onChange={handlePassword}
                type="password"
                aria-label="Enter password"
                className={`outline-2 outline-blue-500 text-2xl p-5 ${
                  password ? "pt-4 pl-7 pr-2 pb-0" : "pl-7"
                } border border-gray-400 rounded w-full`}
              />
            </label>
            <button
              className={`px-2 py-3 ${
                email.length >= 4 && password.length >= 6
                  ? "bg-blue-600"
                  : "bg-blue-300"
              } text-white text-2xl font-bold rounded `}
              disabled={
                email.length >= 4 && password.length >= 6 ? false : true
              }
            >
              Log in
            </button>
            <button
              className="px-2 py-3 bg-blue-600 text-white text-2xl font-bold rounded active:bg-blue-400"
              onClick={() => demoLogin()}
            >
              Demo
            </button>
          </form>
        </div>
        <div className="border border-gray rounded px-16 py-6 bg-white text-xl text-center font-semibold">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#0095f6]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
