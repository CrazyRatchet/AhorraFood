import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkJZEv6eBZBAAR1LMnhaqREWkK_qOrSl8",
  authDomain: "ahorrafood.firebaseapp.com",
  projectId: "ahorrafood",
  storageBucket: "ahorrafood.firebasestorage.app",
  messagingSenderId: "933810382699",
  appId: "1:933810382699:web:5096fd111ea6366214ce2e",
  measurementId: "G-CESLRV4BDR",
};

const app = initializeApp(firebaseConfig);

// Inicializar Auth
let auth;
try {
  auth = initializeAuth(app);
} catch (e) {
  auth = getAuth(app);
}

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Storage
const storage = getStorage(app);

export { app, auth, db, storage };
