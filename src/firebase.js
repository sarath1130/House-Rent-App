// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9uhdFK0qw0EAOIcxLz9CpuYiiCp_jEq0",
  authDomain: "house-rent-react-app.firebaseapp.com",
  projectId: "house-rent-react-app",
  storageBucket: "house-rent-react-app.appspot.com",
  messagingSenderId: "901931930437",
  appId: "1:901931930437:web:8176db0c79a9af51fa642c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
