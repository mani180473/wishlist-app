import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwIIi4LfkdRy7H9X-23z7q02fp7fOD11Q",
  authDomain: "wishlist-app-54d53.firebaseapp.com",
  projectId: "wishlist-app-54d53",
  storageBucket: "wishlist-app-54d53.firebasestorage.app",
  messagingSenderId: "800245253475",
  appId: "1:800245253475:web:1117628ce8f89f543fff56",
  measurementId: "G-GLPLKEZ46F"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();