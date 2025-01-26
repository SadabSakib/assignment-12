import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../components/hooks/useAxiosPublic";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  // const auth = getAuth();
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const   signInUser = (email, password) => {
    setLoading(true);
    console.log(email, password);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("signed out");
        setUser(null);
        // navigate('/login')
      })
      .catch((err) => console.log(err));
  };

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email) {
          const user = { email: currentUser.email };
          axiosPublic
            .post("jwt", user)
            .then((res) => {
              console.log("login token", res.data);
              setLoading(false);
            });
        }
      } else {
        setUser(null);
        axiosPublic
          .post("logout", {}, { withCredentials: true })
          .then((res) => {
            console.log("logout data", res.data);
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    creatUser,
    signInUser,
    handleGoogleSignIn,
    resetPass,
    handleSignOut,
  };

  return (
    // <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
