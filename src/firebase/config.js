import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAb0BeHZzebUMbp6WYsgZcKs-6XOkONIDs",
  authDomain: "photo-album-e7ecf.firebaseapp.com",
  projectId: "photo-album-e7ecf",
  storageBucket: "photo-album-e7ecf.appspot.com",
  messagingSenderId: "489329888702",
  appId: "1:489329888702:web:40b60b806b5f56cf683def",
  databaseURL: "https://photo-album-e7ecf.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);
const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
