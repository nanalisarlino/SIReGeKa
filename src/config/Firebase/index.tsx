// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3TIOQnw-T33IKVUglhhclJXAqcDA_E-c",
  authDomain: "sistem-absensi-rgk.firebaseapp.com",
  projectId: "sistem-absensi-rgk",
  storageBucket: "sistem-absensi-rgk.firebasestorage.app",
  messagingSenderId: "1041978782639",
  appId: "1:1041978782639:web:bc10d9aed6e661666cb55a",
  measurementId: "G-EDCY83BD1F",
  databaseURL: "https://sistem-absensi-rgk-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;