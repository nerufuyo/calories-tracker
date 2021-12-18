import {db} from '../utils/firebaseInit.js';
import {
  addDoc,
  doc,
  getDoc,
  collection,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import UserDb from './UserDb.js';

const colRef = collection(db, 'foodDiaries');

const FoodDiaryDb = {
  async getById(id) {
    const docRef = doc(db, 'foodDiaries', id);

    return await getDoc(docRef);
  },

  async add({name, servingSize, calories, category, date}) {
    const user = await UserDb.getUserAuth();

    return await addDoc(colRef, {
      name,
      servingSize,
      calories,
      category,
      date: new Date(date),
      uid: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  update({id, name, servingSize, calories, category, date}) {
    const docRef = doc(db, 'foodDiaries', id);

    updateDoc(docRef, {
      name,
      servingSize,
      calories,
      category,
      date: new Date(date),
      updatedAt: new Date(),
    })

  }
  // delete(id)
  // getByDateRange( { startDate, endDate } )
};

export default FoodDiaryDb;
