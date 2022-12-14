import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBIHJnWnDoDJcn-6u69fRs2WLyCEbTwr8U",
    authDomain: "testcrud-275da.firebaseapp.com",
    projectId: "testcrud-275da",
    storageBucket: "testcrud-275da.appspot.com",
    messagingSenderId: "620894813920",
    appId: "1:620894813920:web:04badfed61f7fab6345a85",
    measurementId: "G-8W1JP21477"
  };


const app = firebase.initializeApp(firebaseConfig);
export const db =app.firestore();