import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFxdC_QVifRcGMXpAfVYYVbOa2MSfhpbA",
  authDomain: "todoist-firebase-c4ba1.firebaseapp.com",
  projectId: "todoist-firebase-c4ba1",
  storageBucket: "todoist-firebase-c4ba1.appspot.com",
  messagingSenderId: "804650922059",
  appId: "1:804650922059:web:5cc3b3c318a2eba144ddce",
  measurementId: "G-0M7R3SQSPV",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };
