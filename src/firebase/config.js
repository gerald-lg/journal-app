// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_API_KEY,
  VITE_APP_ID,
  VITE_AUTH_DOMAIN,
  VITE_MESSAGING_SENDER_ID,
  VITE_PROJECT_ID,
  VITE_STORE_BUCKET
} = getEnvironments();

// cliente
// console.log(import.meta.env);
// servidor
// console.log(process.env);

// Your web app's Firebase configuration - DEV Y PROD
// const firebaseConfig = {
//   apiKey: "AIzaSyD-jVRPiuVTwnJYxaiFVkamBXfSpQ9w8GU",
//   authDomain: "journal-app-react-176ef.firebaseapp.com",
//   projectId: "journal-app-react-176ef",
//   storageBucket: "journal-app-react-176ef.appspot.com",
//   messagingSenderId: "734204861060",
//   appId: "1:734204861060:web:bd1fc15c17e7a841e940d1"
// };

// Your web app's Firebase configuration -- TESTING
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);