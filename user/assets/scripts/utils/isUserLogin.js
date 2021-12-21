import {auth} from './firebaseInit.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

async function isUserLogin() {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace('/authentication.html');
    }
  });
}

export default isUserLogin;
