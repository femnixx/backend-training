// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg1BgRodxdiUFqaFo9TCAoy2pjkg5_JuQ",
  authDomain: "backend-5566b.firebaseapp.com",
  projectId: "backend-5566b",
  storageBucket: "backend-5566b.firebasestorage.app",
  messagingSenderId: "915051380099",
  appId: "1:915051380099:web:c69c8a2be4e84fee878ab6",
  measurementId: "G-GYBJKXXKL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);