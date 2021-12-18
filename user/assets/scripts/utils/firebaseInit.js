import {getApp, initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import {firebaseConfig} from '../../../../assets/script/globals/config.js';

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {auth, db};
