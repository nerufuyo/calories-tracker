import {signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {auth} from './firebaseInit.js';

function userLoginTest() {
  signInWithEmailAndPassword(auth, 'idwimeianto@gmail.com', 'RahasiaDong');
}

export default userLoginTest;
