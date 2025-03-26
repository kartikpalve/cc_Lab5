// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhEGC0bxwRKEbRFQFc99FAzYhL2rhWhFg",
  authDomain: "astute-impulse-447907-u1.firebaseapp.com",
  projectId: "astute-impulse-447907-u1",
  storageBucket: "astute-impulse-447907-u1.firebasestorage.app",
  messagingSenderId: "531778193935",
  appId: "1:531778193935:web:4125d2c951dc35df7ff17a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
