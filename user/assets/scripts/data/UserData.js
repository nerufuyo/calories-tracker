import {db, auth} from '../utils/firebaseInit.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {getDoc, doc} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

const userProfileData = async () => {
  return new Promise(function(resolve, reject) {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      }
    });

    unsubAuth();
  });
};

const UserData = {
  async getUserAuth() {
    return await userProfileData();
  },

  async docRef() {
    return doc(db, 'userProfile', (await this.getUserAuth()).uid);
  },

  async getUser() {
    const docRef = await this.docRef();

    return (await getDoc(docRef)).data();
  },
};

export default UserData;
