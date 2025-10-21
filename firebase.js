import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVc6llo21YwdeHImbMR0G4g_CxPl6HmW0",
  authDomain: "task-dashboard-424dc.firebaseapp.com",
  projectId: "task-dashboard-424dc",
  storageBucket: "task-dashboard-424dc.firebasestorage.app",
  messagingSenderId: "984924834055",
  appId: "1:984924834055:web:610a4efaa4e986b35a9da2",
  measurementId: "G-WSHPC0379Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// For development - you can remove this in production
// connectFirestoreEmulator(db, 'localhost', 8080);00000000000000000000

export { app, auth, db };

