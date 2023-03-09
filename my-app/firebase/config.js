import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC6VosZSRcHqyMxeeMsD0_dlAU3nHHJDVs",
  authDomain: "native-proj.firebaseapp.com",
  projectId: "native-proj",
  storageBucket: "native-proj.appspot.com",
  messagingSenderId: "454198769654",
  appId: "1:454198769654:web:28a138af8e47385c2bb9d7",
  measurementId: "G-HETRYJJRYL",
};

firebase.initializeApp(firebaseConfig);

export default firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const storage = firebase.storage();
// export { auth, db, storage };
