import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDiBGStt-cK17oMrnixUMoYZWM_xvZ-SA0",
  authDomain: "crwn-db-7678.firebaseapp.com",
  databaseURL: "https://crwn-db-7678.firebaseio.com",
  projectId: "crwn-db-7678",
  storageBucket: "crwn-db-7678.appspot.com",
  messagingSenderId: "508911302921",
  appId: "1:508911302921:web:7031662a7ae608ecf83bd8",
  measurementId: "G-X69JK9D9T9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
