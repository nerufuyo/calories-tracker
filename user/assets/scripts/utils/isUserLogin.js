import {auth} from './firebaseInit.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

async function isUserLogin() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user status: ', user);
    } else {
      console.log('user is not logged');
    }
  });
}

export default isUserLogin;
