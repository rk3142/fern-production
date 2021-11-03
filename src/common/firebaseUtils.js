import * as firebaseui from 'firebaseui'
import firebase from "firebase/compat";
import {signIn} from "../api";
// import { useDispatch } from 'react-redux';
// import { setUser } from "../reducers/userSlice";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/catalog',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                // FIXME
                // const dispatch = useDispatch()
                // dispatch(setUser(idToken))
                localStorage.setItem('auth_token', idToken)
                signIn()
            }).catch(function(error) {
                console.log(error)
            });
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        }
    },
};

firebase.initializeApp(firebaseConfig)

// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(firebase.auth())

// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function (elementId) {
  ui.start(elementId, uiConfig)
}

export {startFirebaseUI}