// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKV9KgIQtaVdCyxoCVs_7IJI35if3nK68",
  authDomain: "alemeno-ab92d.firebaseapp.com",
  projectId: "alemeno-ab92d",
  storageBucket: "alemeno-ab92d.appspot.com",
  messagingSenderId: "329500179887",
  appId: "1:329500179887:web:018c5bb8a5c170d1c7835a",
  measurementId: "G-CPGPC55JVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);