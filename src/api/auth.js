import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

// connectAuthEmulator(auth, "http://localhost:9099")
export const loginWithEmailAndPassword = async (email, password) => {
    const userCreds = await signInWithEmailAndPassword(auth, email, password)
    return userCreds
}

export const isUseAuthenticated = () => auth.currentUser != null

export function onAuthStateChange(f) {
    return auth.onAuthStateChanged(f)
}

export function signOut(){
   return auth.signOut()
}

export function resetPasswordWithEmail(email){
   return sendPasswordResetEmail(auth, email)
}