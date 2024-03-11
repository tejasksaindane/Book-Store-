// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APPP_API_KEY,
  authDomain: import.meta.env.VITE_APPP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APPP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APPP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APPP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APPP_APP_ID,
  measurementId: import.meta.env.VITE_APPP_MESURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
