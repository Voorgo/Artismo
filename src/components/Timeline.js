import PostCard from "./post";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../context/authContext";

const Timeline = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const collectionRef = query(
    collection(db, "users"),
    where("emailAddress", "!=", user?.email),
    orderBy("emailAddress")
  );

  useEffect(() => {
    getDocs(collectionRef).then((snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      setUsers(users);
    });
    // eslint-disable-next-line
  }, [user]);

  return (
    <main>
      <section className="max-w-screen-xs  mx-auto  flex-col ">
        <div className="h-[60px] w-full"></div>
        {users.map((user) => (
          <PostCard user={user} key={user.id} />
        ))}
      </section>
    </main>
  );
};

export default Timeline;
