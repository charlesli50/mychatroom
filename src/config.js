// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKAL5lP68e3fFRMmDURDp524OveyOs5C8",
  authDomain: "myanonchatapp.firebaseapp.com",
  projectId: "myanonchatapp",
  storageBucket: "myanonchatapp.appspot.com",
  messagingSenderId: "722335773628",
  appId: "1:722335773628:web:7e5912b90aac540ac371b9",
  measurementId: "G-GXZ0W1MESN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
