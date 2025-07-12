import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3ZXm5qDnoxxJEsgW--qksLy7xPtGwT_I",
  authDomain: "issuer-portal.firebaseapp.com",
  projectId: "issuer-portal",
  storageBucket: "issuer-portal.appspot.com",
  messagingSenderId: "820821092421",
  appId: "1:820821092421:web:7b25bad31fa2e454b1db2c",
  measurementId: "G-ETC7WMDF73"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
