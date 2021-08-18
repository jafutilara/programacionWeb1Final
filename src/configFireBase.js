import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCfinHcKzGW_PmN2-Ej35rW8qT-QMmSyZY",
    authDomain: "final-programacion-web-i.firebaseapp.com",
    projectId: "final-programacion-web-i",
    storageBucket: "final-programacion-web-i.appspot.com",
    messagingSenderId: "666314133563",
    appId: "1:666314133563:web:5cde4ea31f698101f1cc1e"
  };

  firebase.initializeApp(firebaseConfig);

  export const baseDeDatos =firebase.firestore();
  export default firebase;