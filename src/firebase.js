import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD4m3hccM5751Uv9_1-bzKREGalRzS-Yk",
    authDomain: "galilea-visitas-9328d.firebaseapp.com",
    projectId: "galilea-visitas-9328d",
    storageBucket: "galilea-visitas-9328d.appspot.com",
    messagingSenderId: "187930924693",
    appId: "1:187930924693:web:3492a63147026a592dad9c"
  };
  

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { auth, db };