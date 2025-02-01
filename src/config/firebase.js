import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBbUp_Ujx9yi99pohbnEcG4HxF3qy18dlw",
  authDomain: "mytools-23818.firebaseapp.com",
  projectId: "mytools-23818",
  storageBucket: "mytools-23818.firebasestorage.app",
  messagingSenderId: "83696956858",
  appId: "1:83696956858:web:c5e28eb8776c4918ab5983",
  measurementId: "G-WNJ2WQ9QF7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);