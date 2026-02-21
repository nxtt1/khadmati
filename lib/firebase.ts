import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC30Qv8NcgOUZ6REk1XYNlisv5u2XBxKVU",
    authDomain: "kadamati-e56a1.firebaseapp.com",
    projectId: "kadamati-e56a1",
    storageBucket: "kadamati-e56a1.firebasestorage.app",
    messagingSenderId: "773907803268",
    appId: "1:773907803268:web:83a3e65e7d759749db66d1",
    measurementId: "G-RGXTMR5W8E",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with settings to force long polling (fixes hanging on some networks)
let db: Firestore;
try {
    db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
    });
} catch (e) {
    // If already initialized (e.g. during hot reload), use existing instance
    db = getFirestore(app);
}

export { app, auth, db };
