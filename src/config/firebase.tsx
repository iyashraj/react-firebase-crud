import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBaAVKv00joQMQCl_X1sE-AtJVpV5nG4Zg",
  authDomain: "fir-tut-451a5.firebaseapp.com",
  projectId: "fir-tut-451a5",
  storageBucket: "fir-tut-451a5.appspot.com",
  messagingSenderId: "745964805016",
  appId: "1:745964805016:web:899cdfad6dd250e260e9ed",
  measurementId: "G-H72BDGMW09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const DB = getFirestore(app)