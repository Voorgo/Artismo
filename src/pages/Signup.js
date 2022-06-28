import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, name, username);

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Artismo";
  });
  return (
    <div className="container mx-auto flex items-center max-w-screen-md h-screen justify-center p-5">
      <div className="w-2/4 hidden md:flex">
        <img src={"/images/iphone-with-app.jpg"} alt="app preview on phone" />
      </div>
      <div className="flex gap-4 flex-col max-w-lg w-full md:w-[45%]">
        <div className="flex flex-col  xs:bg-white xs:px-10 xs:pb-10 xs:border xs:border-gray-primary xs:mb-4 xs:rounded">
          <h1 className="font-nosfier text-5xl text-center my-10">Artismo</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              onChange={handleUsername}
              type="text"
              placeholder="Username"
              aria-label="Enter username"
              className="outline-2 outline-blue-500 text-2xl p-3 pl-5 overflow-ellipsis
                 border border-gray-400 rounded w-full"
            />
            <input
              onChange={handleName}
              placeholder="Full Name"
              type="text"
              aria-label="Enter full name"
              className="outline-2 outline-blue-500 text-2xl p-3 pl-5 overflow-ellipsis
               border border-gray-400 rounded w-full"
            />
            <input
              onChange={handleEmail}
              placeholder="Email address"
              type="email"
              aria-label="Enter email address"
              className="outline-2 outline-blue-500 text-2xl p-3 pl-5 overflow-ellipsis
               border border-gray-400 rounded w-full"
            />
            <input
              onChange={handlePassword}
              placeholder="Password"
              type="password"
              aria-label="Enter password"
              className="outline-2 outline-blue-500 text-2xl p-3 pl-5 overflow-ellipsis
               border border-gray-400 rounded w-full"
            />
            <button className="px-6 py-3  bg-blue-600 text-white text-2xl font-bold rounded">
              Sign Up
            </button>
          </form>
        </div>
        <div className="border border-gray rounded px-16 py-6 bg-white text-xl text-center font-semibold">
          <p>
            Have an account?{" "}
            <Link to="/login" className="font-bold text-[#0095f6]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
