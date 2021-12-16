import {getApp, initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {firebaseConfig} from '../../../../assets/script/globals/config.js';

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
