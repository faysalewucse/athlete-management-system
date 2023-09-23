import React, { useContext, useEffect } from "react";
import { useState } from "react";
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
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
    setLoading(true);
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        setCurrentUser({ ...user });
      })
      .catch((error) => {
        setError(error.message);
      });
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
    error,
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
