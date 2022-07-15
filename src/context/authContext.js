import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function signUp(email, password, name, username, setError) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((e) => setError(e.message));
    setDoc(doc(db, "users", email), {
      name,
      username: username.toLowerCase(),
      emailAddress: email.toLocaleLowerCase(),
      dateCreate: Date.now(),
      id: v4(),
    });
  }

  function login(email, password) {
    setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    signOut(auth);
    navigate("/login");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/");
      } else {
        setUser({});
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
