import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useCurrentUser = (user) => {
  const [currentuser, setCurrentUser] = useState({});

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCurrentUser(doc.data());
    });
  }, [user]);

  return [currentuser];
};
