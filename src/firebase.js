import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyB6VzxXgPoWVFW1IOTP0VQdKay2KkVzKhs",
	authDomain: "face-book-f1035.firebaseapp.com",
	projectId: "face-book-f1035",
	storageBucket: "face-book-f1035.appspot.com",
	messagingSenderId: "447228525254",
	appId: "1:447228525254:web:c15e99dd40337d605d35c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage, auth };
