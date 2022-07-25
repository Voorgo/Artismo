import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase";
import UsersWhoLiked from "./UsersWhoLiked";

const Like = ({ likes, id }) => {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(likes.includes(user?.displayName));

  const toggleLiked = async () => {
    if (!toggle) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user?.displayName),
      });
      setToggle(true);
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user?.displayName),
      });
      setToggle(false);
    }
  };
  return (
    <div className="flex gap-3 p-5">
      <div className="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className={`h-10 w-10 cursor-pointer ${
            toggle ? "fill-red-500 text-red-500" : null
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={toggleLiked}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      {likes ? (
        <div className="text-xl font-bold self-center leading-4 select-none relative group cursor-pointer">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
          {likes.length > 0 ? <UsersWhoLiked users={likes} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default Like;
