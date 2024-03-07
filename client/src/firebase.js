// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5dc24.firebaseapp.com",
  projectId: "real-estate-5dc24",
  storageBucket: "real-estate-5dc24.appspot.com",
  messagingSenderId: "174175414166",
  appId: "1:174175414166:web:1297204ad7f0766b099fb7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
