// config/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUq91sM4yKiZUWDqg_g5ITyHqN8BXCkQ0",
  authDomain: "fir-tanzil-portfolio.firebaseapp.com",
  projectId: "fir-tanzil-portfolio",
  storageBucket: "fir-tanzil-portfolio.firebasestorage.app",
  messagingSenderId: "762555415700",
  appId: "1:762555415700:web:3b8b76ad8c71c8d2a64881",
  measurementId: "G-8H3V6ZHEEB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Only run getAnalytics on client
export const analytics =
  typeof window !== "undefined"
    ? require("firebase/analytics").getAnalytics(app)
    : null;
