import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig= {
  apiKey: "AIzaSyDKuoCBFoB61Hc3HYtLd_Rdja9E87IwbQA",
  authDomain: "hellofb-eccf8.firebaseapp.com",
  projectId: "hellofb-eccf8",
  storageBucket: "hellofb-eccf8.appspot.com",
  messagingSenderId: "696314683090",
  appId: "1:696314683090:web:c7f30275444be104dfd70b"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}



export const auth = firebase.auth();