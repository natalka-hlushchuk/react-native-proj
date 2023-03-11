import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6VosZSRcHqyMxeeMsD0_dlAU3nHHJDVs",
  authDomain: "native-proj.firebaseapp.com",
  projectId: "native-proj",
  storageBucket: "native-proj.appspot.com",
  messagingSenderId: "454198769654",
  appId: "1:454198769654:web:28a138af8e47385c2bb9d7",
  measurementId: "G-HETRYJJRYL",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
