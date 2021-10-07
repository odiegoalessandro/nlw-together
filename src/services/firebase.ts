import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyAo_wfklamQ51RcuyHQwyXvphC-1jbKSM0",
  authDomain: "letmeask-8ab14.firebaseapp.com",
  projectId: "letmeask-8ab14",
  storageBucket: "letmeask-8ab14.appspot.com",
  messagingSenderId: "695748821194",
  appId: "1:695748821194:web:d5c0aabbdb16315300b433"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}

const auth = firebase.auth()

export { 
  firebase,
  auth, 
}