import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPiaYsbahfmpHvYfw5BeIhujrXPKk2HrI",
  authDomain: "my-portfolio-a6566.firebaseapp.com",
  projectId: "my-portfolio-a6566",
  storageBucket: "my-portfolio-a6566.firebasestorage.app",
  messagingSenderId: "228977176391",
  appId: "1:228977176391:web:6a86aa876cc60769886662",
  measurementId: "G-SE3JCN37R3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };