// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADamUDCYsKhA8X_gac6z-nMBJEj7XTrBw",
  authDomain: "todolist-daff0.firebaseapp.com",
  projectId: "todolist-daff0",
  storageBucket: "todolist-daff0.appspot.com",
  messagingSenderId: "754599494030",
  appId: "1:754599494030:web:9805106b1cae624cd2a4df"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};