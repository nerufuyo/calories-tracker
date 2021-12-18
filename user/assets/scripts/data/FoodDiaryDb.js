import {db} from '../utils/firebaseInit.js';
import {addDoc, collection, serverTimestamp} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import UserDb from './UserDb.js';

const colRef = collection(db, 'foodDiaries');

const FoodDiaryDb = {
  async add({name, servingSize, calories, category, date}) {
    const user = await UserDb.getUserAuth();

    return await addDoc(colRef, {
      name,
      servingSize,
      calories,
      category,
      date: new Date(date),
      uid: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },
  // update( { name, serving_size, calories, category, date} )
  // delete(id)
  // getById(id)
  // getByDateRange( { startDate, endDate } )
};

export default FoodDiaryDb;
