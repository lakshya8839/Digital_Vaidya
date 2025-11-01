import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y",
  authDomain: "gen-lang-client-0305521767.firebaseapp.com",
  projectId: "gen-lang-client-0305521767",
  storageBucket: "gen-lang-client-0305521767.firebasestorage.app",
  messagingSenderId: "1045199943755",
  appId: "1:1045199943755:web:4964c2c22b6d04f563f5ce"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
