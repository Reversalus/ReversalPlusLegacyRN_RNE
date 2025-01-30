// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7ovFwm3v2M3iv9Ky8552ZE4GAZoKV3Cc",
  authDomain: "reversalplus-93801.firebaseapp.com",
  projectId: "reversalplus-93801",
  storageBucket: "reversalplus-93801.firebasestorage.app",
  messagingSenderId: "387654630479",
  appId: "1:387654630479:web:0299540ced53158ad13e3a",
  measurementId: "G-0Q1W74QKWN"
};

// Initialize Firebase for web
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };