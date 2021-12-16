import { firebaseConfig } from '../../../../assets/script/globals/config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';


initializeApp(firebaseConfig);
const auth = getAuth();

function userLoginTest() {
  signInWithEmailAndPassword(auth, 'idwimeianto@gmail.com', 'RahasiaDong');
}

export default userLoginTest;