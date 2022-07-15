import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const uniqueUsername = async (username) => {
  const usernameRef = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  let result = await getDocs(usernameRef);

  return result.docs.length > 0;
};

export default uniqueUsername;
