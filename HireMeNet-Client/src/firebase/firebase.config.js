// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrRocTWZINReM_c5NWalhAsQQvSZ1MGBQ",
  authDomain: "hireme-net.firebaseapp.com",
  projectId: "hireme-net",
  storageBucket: "hireme-net.appspot.com",
  messagingSenderId: "640069444081",
  appId: "1:640069444081:web:46b9cbe38c19ccaae8a450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;