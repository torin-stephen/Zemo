import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHWpaWE8HeswqQyR8zChomNFkVfYnuyo4",
  authDomain: "linktree-95320.firebaseapp.com",
  projectId: "linktree-95320",
  storageBucket: "linktree-95320.appspot.com",
  messagingSenderId: "51479558172",
  appId: "1:51479558172:web:296d2e356d1b93a62a07d9"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
