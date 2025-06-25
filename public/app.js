import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"

const auth = getAuth();
const db = getFirestore();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const provider = new GoogleAuthProvider();
signInBtn.onclick = () => {signInWithPopup(auth, provider)};
signOutBtn.onclick = () => {signOut(auth)};

const userDetails = document.getElementById('userDetails');
const contactRequestList = document.getElementById('contactRequestList');

auth.onAuthStateChanged(user => {
  if (user) { // if signed in
     whenSignedIn.hidden = false;
     whenSignedOut.hidden = true;

     userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`
     contactRequestList.innerHTML = `<p>yo?</p>`
    } else {
     whenSignedIn.hidden = true;
     whenSignedOut.hidden = false;
  }
});