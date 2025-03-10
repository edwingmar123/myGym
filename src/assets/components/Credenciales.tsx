import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCtkpKVD_CgBOAAQB1Y_wXuJ3XaG9aokpc",
  authDomain: "mygym-f48a2.firebaseapp.com",
  projectId: "mygym-f48a2",
  storageBucket: "mygym-f48a2.firebasestorage.app",
  messagingSenderId: "443780847112",
  appId: "1:443780847112:web:e62488a1daa162176da3bd",
  measurementId: "G-TD41NDH0JC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Exporta Firestore
export default app;