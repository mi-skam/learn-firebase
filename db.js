// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2q3ZrxP74KYG2FyApGPwvYcrC6EjEHQQ",
  authDomain: "learn-pwa-51779.firebaseapp.com",
  projectId: "learn-pwa-51779",
  storageBucket: "learn-pwa-51779.appspot.com",
  messagingSenderId: "1066412195315",
  appId: "1:1066412195315:web:7aaf2b00c6120eb71ee686",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true, merge: true });
