import {auth} from './firebaseInit.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

async function isUserLogin() {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user status: ', user);
    } else {
      console.log('user status: user is not logged');
    }
  });
}

export default isUserLogin;
