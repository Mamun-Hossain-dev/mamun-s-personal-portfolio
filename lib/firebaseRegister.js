// lib/firebaseRegister.js
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../config/firebase.config";

export const registerWithEmail = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
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

    // Optional: Add user to Firestore if needed
    // await addUserToFirestore(result.user);

    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw new Error(error.message);
  }
};
