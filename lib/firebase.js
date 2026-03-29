import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA71iNPpNNGTUqbuuDN_psBhD8QuQ0LPm0",
  authDomain: "pink-cloud-1cc2a.firebaseapp.com",
  projectId: "pink-cloud-1cc2a",
  storageBucket: "pink-cloud-1cc2a.firebasestorage.app",
  messagingSenderId: "828972005710",
  appId: "1:828972005710:web:41d74860b989449683861f",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
