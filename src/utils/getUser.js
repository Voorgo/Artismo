import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getUserProfile = (username, setUserProfile, setIsLoading) => {
  const userRef = query(
    collection(db, "users"),
    where("username", "==", username)
  );
  onSnapshot(userRef, (docs) => {
    docs.forEach((doc) => setUserProfile({ ...doc.data() }));
    setIsLoading(false);
  });
};

export const getUserPosts = async (username, setPosts) => {
  const userRef = query(
    collection(db, "posts"),
    where("username", "==", username)
  );

  onSnapshot(userRef, (docs) => {
    let posts = [];
    docs.forEach((doc) => posts.push(doc.data()));
    posts.sort((a, b) => b.created - a.created);
    setPosts(posts);
  });
};
