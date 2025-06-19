// lib/firebaseRegister.js
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider, db } from "../config/firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const registerWithEmail = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
  // Create user doc in Firestore with default role 'user', retry if offline
  const userDocRef = doc(db, "users", userCredential.user.uid);
  let attempts = 0;
  let lastError = null;
  while (attempts < 3) {
    try {
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email,
        displayName: name,
        role: "user",
        createdAt: new Date(),
      });
      break;
    } catch (err) {
      lastError = err;
      if (err.code === "unavailable" || err.message?.includes("offline")) {
        attempts++;
        await new Promise((res) => setTimeout(res, 1000 * attempts));
      } else {
        throw err;
      }
    }
  }
  if (attempts === 3 && lastError) {
    throw new Error(
      "Failed to create user profile in Firestore. Please check your connection and try again."
    );
  }
  return userCredential.user;
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// lib/firebaseRegister.js
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Add user to Firestore if not exists, retry if offline
    const userDocRef = doc(db, "users", result.user.uid);
    let userDoc = await getDoc(userDocRef);
    let attempts = 0;
    let lastError = null;
    while (!userDoc.exists() && attempts < 3) {
      try {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          role: "user",
          createdAt: new Date(),
        });
        userDoc = await getDoc(userDocRef);
        break;
      } catch (err) {
        lastError = err;
        if (err.code === "unavailable" || err.message?.includes("offline")) {
          attempts++;
          await new Promise((res) => setTimeout(res, 1000 * attempts));
        } else {
          throw err;
        }
      }
    }
    if (!userDoc.exists() && lastError) {
      throw new Error(
        "Failed to create user profile in Firestore after Google sign-in. Please check your connection and try again."
      );
    }
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
