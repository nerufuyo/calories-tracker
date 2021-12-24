import {db, auth} from '../utils/firebaseInit.js';
import {onAuthStateChanged, getAuth, updateEmail} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import {
  getDoc,
  updateDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

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

const UserDb = {
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

  async update({fullname, gender, birthday, height, weight, email}) {
    const docRef = await this.docRef();

    updateDoc(docRef, {
      fullname,
      gender,
      birthday: new Date(birthday),
      height: parseInt(height),
      weight: parseInt(weight),
      updatedAt: new Date(),
    });

    return await updateEmail(auth.currentUser, email);
  },
};

export default UserDb;
