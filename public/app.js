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
async function showContactRequests() {
  try {
    const contactReqsRef = collection(db, 'contactRequests');
    const snapshot = await getDocs(contactReqsRef);

    if (snapshot.empty) {
      contactRequestList.innerHTML = '<p>No contact requests found.</p>';
      return;
    }

    let html = '<h3>Current customer requests:</h3><ul>';
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `<li>${data.message || 'No message'}</li>`;
    });
    html += '</ul>';
    contactRequestList.innerHTML = html;
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    contactRequestList.innerHTML = '<p>Error loading contact requests.</p>';
  }
}

auth.onAuthStateChanged(user => {
  if (user) { // if signed in
     whenSignedIn.hidden = false;
     whenSignedOut.hidden = true;

     userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`
     showContactRequests()
     
    } else {
     whenSignedIn.hidden = true;
     whenSignedOut.hidden = false;
  }
});