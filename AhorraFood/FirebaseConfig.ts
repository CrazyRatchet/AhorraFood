import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkJZEv6eBZBAAR1LMnhaqREWkK_qOrSl8",
  authDomain: "ahorrafood.firebaseapp.com",
  projectId: "ahorrafood",
  storageBucket: "ahorrafood.appspot.com",
  messagingSenderId: "933810382699",
  appId: "1:933810382699:web:5096fd111ea6366214ce2e",
  measurementId: "G-CESLRV4BDR",
};

const app = initializeApp(firebaseConfig);

// 👇 lógica segura para evitar el error "Component auth has not been registered yet"
let auth;
try {
  auth = initializeAuth(app, {
  });
} catch (e) {
  auth = getAuth(app); // ya estaba inicializado
}

const db = getFirestore(app);

export { app, auth, db };
