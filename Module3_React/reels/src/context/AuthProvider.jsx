// Will store all details related to Auth that can be used in other components 

import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
export const AuthContext = React.createContext(); // Kahi bhi use hojae ye context pori app me

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return firebaseAuth.signOut();
  }

  function signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email , password);
  }

  useEffect(() => {
    // event attach kra hai jo current user ko set krega null ya user se only if state gets changed
    // logged In state => loggedOut state
    // loggedOut state => loggedIn state
    firebaseAuth.onAuthStateChanged((user) => {
      // console.log("Inside auth state changed !!", user);
      setCurrentUser(user);
    });
  }, []);

  let value = {
    currentUser: currentUser,
    signOut: signOut,
    login: login,
    signUp: signUp,
  };
  // ye value ab sare children ko accessible hogi 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}