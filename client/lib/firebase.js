import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkVfk-V-a4GrR3gV0IUHkoA3-qhE919kQ",
  authDomain: "restaurant-finder-a818e.firebaseapp.com",
  projectId: "restaurant-finder-a818e",
  storageBucket: "restaurant-finder-a818e.firebasestorage.app",
  messagingSenderId: "904823809089",
  appId: "1:904823809089:web:801ada75b6db1a919812c0",
  measurementId: "G-2N2ETTNMCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);