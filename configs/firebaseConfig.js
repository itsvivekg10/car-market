// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyDzU4KMcHdn54e9NbXLMOef94WCtgL7AKo",
  authDomain: "car-marketplace-dba59.firebaseapp.com",
  projectId: "car-marketplace-dba59",
  storageBucket: "car-marketplace-dba59.appspot.com",
  messagingSenderId: "837218210457",
  appId: "1:837218210457:web:81d86c3d100350134b1e08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
