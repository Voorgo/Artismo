import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const getUserProfile = (username, setUserProfile, setIsLoading) => {
  const userRef = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  getDocs(userRef).then((snapshot) => {
    snapshot.forEach((doc) => setUserProfile({ ...doc.data() }));
    setIsLoading(false);
  });
};

export const getUserPosts = (username, setPosts) => {
  onSnapshot(doc(db, "posts", `${username}`), (doc) => {
    setPosts(doc.data()?.imageSrcAndLikes);
  });
};
