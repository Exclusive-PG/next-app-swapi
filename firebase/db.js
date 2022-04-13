import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const clientCredentials = {
    apiKey: "AIzaSyAp5w7d9fTh81rQ7tCm1qdRyCzh8_2--xQ",
    authDomain: "swapi-films-next-app.firebaseapp.com",
    projectId: "swapi-films-next-app",
    storageBucket: "swapi-films-next-app.appspot.com",
    messagingSenderId: "736590779749",
    appId: "1:736590779749:web:a93691b53fd578fae63d8c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
  }
  
  export default firebase;