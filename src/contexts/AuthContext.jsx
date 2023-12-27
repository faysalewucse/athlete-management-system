import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { baseUrl } from "../utils/Constant";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const auth = getAuth();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // TODO1: remove setLoading function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("from context", user);
      setCurrentUser(user);

      // getUsersData from Database if not found save to database
      if (user) {
        await axios
          .get(`${baseUrl}/users/${user.email}`)
          .then(({ data: userData }) => {
            if (userData) {
              setCurrentUser(userData);
            }
          });
      } else {
        setCurrentUser(user);
      }

      if (user) {
        axios
          .post(`${baseUrl}/jwt`, {
            email: user.email,
          })
          .then((response) => {
            localStorage.setItem("access_token", response.data.token);
          });
      } else {
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //signup function
  async function signup(email, password, username, userData) {
    await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser({ ...userData });
  }

  //login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // signin with google
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // facebook
  function facebookSignIn() {
    const googleAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  //logout function
  function logout() {
    return signOut(auth);
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
    return "Sent";
  }

  const value = {
    currentUser,
    loading,
    setLoading,
    signup,
    login,
    logout,
    googleSignIn,
    resetPassword,
    facebookSignIn,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
