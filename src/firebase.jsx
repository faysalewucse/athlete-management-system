import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAexLDAyQE6OrSqnRESqAjSMp1mNuNdxo4",
  authDomain: "overtime-athletic-management.firebaseapp.com",
  projectId: "overtime-athletic-management",
  storageBucket: "overtime-athletic-management.appspot.com",
  messagingSenderId: "957242065537",
  appId: "1:957242065537:web:23d63034c25acc21dc0380",
  measurementId: "G-F83PRFGJT4",
});

// const app = initializeApp({
//   apiKey: "AIzaSyB-M9gfxGTY-f7j_lMcKB-0y352t9eVBYw",
//   authDomain: "overtime-ams.firebaseapp.com",
//   projectId: "overtime-ams",
//   storageBucket: "overtime-ams.appspot.com",
//   messagingSenderId: "996551945865",
//   appId: "1:996551945865:web:ab5923f3b948d62bd8e058",
// });

export default app;
