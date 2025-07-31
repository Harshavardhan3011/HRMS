// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ For chat
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCxvIrqkudtZGa-CrL7gJ0ogrvWrk7fUbc",
  authDomain: "hrms-project-27500.firebaseapp.com",
  databaseURL: "https://hrms-project-27500-default-rtdb.firebaseio.com", // ✅ needed for Realtime DB
  projectId: "hrms-project-27500",
  storageBucket: "hrms-project-27500.firebasestorage.app",
  messagingSenderId: "673489028804",
  appId: "1:673489028804:web:cd5a51152f2611e37eeb91",
  measurementId: "G-BCT7Y5M096",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Database
export const db = getDatabase(app);

// ✅ Export Analytics (optional)
export const analytics = getAnalytics(app);
