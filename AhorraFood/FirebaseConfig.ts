// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from 'firebase/auth';
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkJZEv6eBZBAAR1LMnhaqREWkK_qOrSl8",
    authDomain: "ahorrafood.firebaseapp.com",
    projectId: "ahorrafood",
    storageBucket: "ahorrafood.firebasestorage.app",
    messagingSenderId: "933810382699",
    appId: "1:933810382699:web:5096fd111ea6366214ce2e",
    measurementId: "G-CESLRV4BDR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});