// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4RqfSGKvI2Px-H22lQMdC_5GDJmcJ9iM",
    authDomain: "codepostauth.firebaseapp.com",
    projectId: "codepostauth",
    storageBucket: "codepostauth.firebasestorage.app",
    messagingSenderId: "807814683112",
    appId: "1:807814683112:web:ae74cfe8fec9a58d5bac5d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
