import * as firebase from "firebase";
import "firebase/auth";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJV-iBFta5VJOqKQpkH_hx4kXlIEpl1Qw",
  authDomain: "publications-e8633.firebaseapp.com",
  projectId: "publications-e8633",
  storageBucket: "publications-e8633.appspot.com",
  messagingSenderId: "96492481840",
  appId: "1:96492481840:web:6e2a9116c498f625eb2cf5",
  measurementId: "G-VN76Q68RCT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;
