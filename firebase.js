// Import the functions you need from the SDKs you need
import 'firebase/compat';
import * as firebase from "firebase/compat";
import {getFirestore} from "firebase/firestore";
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIP1nL3YbxXsABT5foyaaVoMOMXizsdZo",
  authDomain: "ezlaundry-9ec2a.firebaseapp.com",
  projectId: "ezlaundry-9ec2a",
  storageBucket: "ezlaundry-9ec2a.appspot.com",
  messagingSenderId: "969724570074",
  appId: "1:969724570074:web:d0abce76a5e88dee2c78e3",
  measurementId: "G-J6JMJ0X4Z9"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

// initialize auth
const auth = firebase.auth();
const db = getFirestore();
const database = getDatabase(app);

export { auth, db };
