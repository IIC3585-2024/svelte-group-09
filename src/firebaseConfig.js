// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDELbvjv1dKhOjtDJb3VRPIAogS9q2L3eI",
  authDomain: "svelte-grupo9.firebaseapp.com",
  projectId: "svelte-grupo9",
  storageBucket: "svelte-grupo9.appspot.com",
  messagingSenderId: "162117495638",
  appId: "1:162117495638:web:06d36082d7c799419e84f7",
  measurementId: "G-ET2D5SRQET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (typeof window !== 'undefined') {
  // Only import and initialize analytics if we're in a client environment
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch(console.error);
}

export { app, auth };
