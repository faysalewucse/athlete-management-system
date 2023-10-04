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
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

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
      setCurrentUser(user);

      // getUsersData from Database if not found save to database
      if (user) {
        await axios
          .get(`${import.meta.env.VITE_BASE_API_URL}/users/${user.email}`)
          .then(({ data: userData }) => {
            if (userData) {
              setCurrentUser(userData);
            } else {
              const newUser = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                address: "",
                gender: "",
                phoneNumber: "",
                role: "student",
              };
              axios
                .post(`${import.meta.env.VITE_BASE_API_URL}/user`, newUser)
                .then((response) => {
                  if (response.status === 200) {
                    setCurrentUser(newUser);
                  }
                });
            }
          });
      } else {
        setCurrentUser(user);
      }

      // TODO: update it to by storing access token to cookie
      // get jwt token and save it to local storage
      // TODO: change the URL
      if (user) {
        axios
          .post(`${import.meta.env.VITE_BASE_API_URL}/jwt`, {
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
  async function signup(email, password, username, photoURL) {
    await createUserWithEmailAndPassword(auth, email, password);

    // updateProfile
    await updateUserProfile(username, photoURL);

    const user = auth.currentUser;

    setCurrentUser({ ...user });
  }

  async function updateUserProfile(username, photoURL) {
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photoURL,
    });
  }

  //login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // signin with google
  async function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  //logout function
  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    sendPasswordResetEmail(auth, email);
  }

  const value = {
    currentUser,
    loading,
    setLoading,
    signup,
    login,
    logout,
    googleSignIn,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
