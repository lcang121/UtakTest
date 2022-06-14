import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAhWbQDIhhCt7i9xYPPGCKzHaA2_8U3IjQ",
  authDomain: "utaktest-d92f3.firebaseapp.com",
  databaseURL:
    "https://utaktest-d92f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utaktest-d92f3",
  storageBucket: "utaktest-d92f3.appspot.com",
  messagingSenderId: "704115447715",
  appId: "1:704115447715:web:233add18847eb7de042c16",
  measurementId: "G-4SM5PCTGSK",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
