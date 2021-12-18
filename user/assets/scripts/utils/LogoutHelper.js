import {signOut} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {auth} from './firebaseInit.js';

const LogoutHelper = {
  async init({logoutButton, unsubAuth}) {
    logoutButton.addEventListener('click', () => {
      this._logoutUser(unsubAuth);
    });
  },

  async _logoutUser(unsubAuth) {
    signOut(auth)
        .then(() => {
          unsubAuth.then((unsubscribe) => {
            unsubscribe();
          });
          console.log('user signed out');
          window.location.replace('/authentication.html');
        })
        .catch((err) => {
          console.log(err.message);
        });
  },
};

export default LogoutHelper;
