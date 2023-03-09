import PostCard from "./post";
import { db } from "../firebase";
import { useState, useEffect, Suspense } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../context/authContext";

const Timeline = () => {
  const [usersPosts, setUsers] = useState([]);
  const { user } = useAuth();

  const collectionRef = query(
    collection(db, "posts"),
    where("email", "!=", user?.email),
    orderBy("email")
  );
  useEffect(() => {
    onSnapshot(collectionRef, (docs) => {
      let users = [];
      docs.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      setUsers(users);
    });
    // eslint-disable-next-line
  }, [user]);

  return (
    <main>
      <section className="max-w-screen-xs mx-auto flex flex-col pb-10">
        <div className="h-[60px] w-full w-screen-xs"></div>
        {usersPosts.map((post, i) =>
          usersPosts.length > 0 ? <PostCard post={post} key={i} /> : null
        )}
      </section>
    </main>
  );
};

export default Timeline;
