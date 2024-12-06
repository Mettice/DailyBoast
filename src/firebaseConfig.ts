import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7cPqU84fydY-TeWKfyGz58_yIG7MTOLU",
    authDomain: "boostai-b2092.firebaseapp.com",
    projectId: "boostai-b2092",
    storageBucket: "boostai-b2092.appspot.com",
    messagingSenderId: "74255594895",
    appId: "1:74255594895:web:ad60c79a093bfb8fa207fa",
    measurementId: "G-ETKNC707DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app); 