import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIe6P7udDVng16rQkTVPzVv2_L4EuillY",
  authDomain: "gang-f0e99.firebaseapp.com",
  projectId: "gang-f0e99",
  storageBucket: "gang-f0e99.appspot.com",
  messagingSenderId: "95037685251",
  appId: "1:95037685251:web:f53dfa3f89a40fc57b1836",
  measurementId: "G-WLV9L8Q3GX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
