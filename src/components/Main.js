import PostCard from "./post";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import {
  updateDoc,
  doc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/authContext";

const Main = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const collectionRef = query(
    collection(db, "users"),
    where("emailAddress", "!=", user?.email)
  );

  useEffect(() => {
    getDocs(collectionRef).then((snapshot) => {
      let users = [];
      snapshot.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      setUsers(users);
    });
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

export default Main;
