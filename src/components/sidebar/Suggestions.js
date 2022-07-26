import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const collectionRef = query(
    collection(db, "users"),
    where("emailAddress", "!=", user?.email),
    orderBy("emailAddress"),
    limit(3)
  );

  useEffect(() => {
    getDocs(collectionRef).then((docs) => {
      let suggestedUsers = [];
      docs.forEach((doc) => {
        suggestedUsers.push(doc.data());
      });
      setUsers(suggestedUsers);
    });
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold mt-5">Suggestions for you</div>
      {users.map((user, i) => (
        <div key={i} className="flex items-center gap-5">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.userPhoto
                  ? user.userPhoto
                  : require("../../images/user.png")
              }
              alt="avatar"
              className="w-14 h-14 rounded-full object-cover max-w-none"
              loading="lazy"
            />
          </Link>
          <p className="text-xl font-bold">{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
