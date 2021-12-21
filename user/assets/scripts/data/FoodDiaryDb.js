import {db} from '../utils/firebaseInit.js';
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  collection,
  updateDoc,
  deleteDoc,
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
      servingSize: parseInt(servingSize),
      calories: parseInt(calories),
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
      servingSize: parseInt(servingSize),
      calories: parseInt(calories),
      category,
      date: new Date(date),
      updatedAt: new Date(),
    })

  },

  async getByDateRange({startDate, endDate}) {
    const q = query(colRef, 
      where(
        "date", ">=", new Date(startDate)
      ), 
      where(
        "date", "<=", new Date(endDate)
      ),
      where(
        "uid", '==', (await UserDb.getUserAuth()).uid
      ),
      orderBy('date', 'desc')
    );

    const snapshot = await getDocs(q);

    const foods = [];

    snapshot.docs.forEach(doc => {
      foods.push({ 
        ...doc.data(), 
        date: doc.data().date.toDate(), 
        id: doc.id })
    })

    return foods;
  },

  async delete(id) {
    const docRef = doc(db, 'foodDiaries', id)

    await deleteDoc(docRef);
  }
};

export default FoodDiaryDb;
