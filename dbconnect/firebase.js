// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx6OgzG5t6UMc7RGta0ZEiH8QQ-Qy_kMY",
  authDomain: "food-ordering-app-410606.firebaseapp.com",
  projectId: "food-ordering-app-410606",
  storageBucket: "food-ordering-app-410606.appspot.com",
  messagingSenderId: "336385661646",
  appId: "1:336385661646:web:e8bb6291e4c315d765ce9f",
  measurementId: "G-R08MBZ5KGD"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)