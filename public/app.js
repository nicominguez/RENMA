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
const contactReqsRef = collection(db, 'contactRequests');
const snapshot = await getDocs(contactReqsRef);


auth.onAuthStateChanged(user => {
  if (user) { // if signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;

    userDetails.innerHTML = `<h3>Hi ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`

    let html = '<h3>Current customer requests:</h3><ul>';
    snapshot.forEach(doc => {
      const data = doc.data();
      const message = data.message || ''; // fallback

      // Escape HTML to prevent XSS
      const escapedMessage = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      html += `<li>${escapedMessage}</li>`;
    });
    html += '</ul>';

    const contactRequestList = document.getElementById('contactRequestList');
    if (contactRequestList) {
      contactRequestList.innerHTML = html;
    } else {
      console.error('Element #contactRequestList not found.');
    }

     
  } else { // if signed out
     whenSignedIn.hidden = true;
     whenSignedOut.hidden = false;
  }
});