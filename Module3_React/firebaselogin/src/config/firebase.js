import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyD2r2Tym9Crco72krWFG2t-2DA0JEmoWQg",
    authDomain: "react-login-270a8.firebaseapp.com",
    projectId: "react-login-270a8",
    storageBucket: "react-login-270a8.appspot.com",
    messagingSenderId: "952372631412",
    appId: "1:952372631412:web:24651884caabe5f8997e21"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export default firebaseAuth; 