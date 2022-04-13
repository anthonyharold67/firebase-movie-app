// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, updateProfile,onAuthStateChanged, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

/* const firebaseConfig = {
  apiKey: "AIzaSyDnYFrWuzFOY_XV1Lqmog7bi8xCExj1Nhc",
  authDomain: "movie-app-b322f.firebaseapp.com",
  projectId: "movie-app-b322f",
  storageBucket: "movie-app-b322f.appspot.com",
  messagingSenderId: "1080982377467",
  appId: "1:1080982377467:web:07b8e2f38de0896bc8315e"
};
 */
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export const createUser = async (email,password,navigate,displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {displayName: displayName})
    console.log(userCredential)
    navigate("/")
  }
  catch(error) {
   alert(error.message)
  }

  /* .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */
}

export const signIn =async (email,password,navigate)=>{
  
  
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential)
    navigate("/")
  }
  catch(error) {
   alert(error.message)
  }
  
}

export const logOut = () => {
  signOut(auth);
  alert("logged out successfully");
};

export const userObserver = (setCurrentUser)=>{
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {  
      setCurrentUser(currentUser)
      
      // ...
    } else {
      setCurrentUser(false);
    }
  });
}


export const signUpProvider = (navigate)=> {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate("/")

  }).catch((error) => {
    console.log(error);
  });
}