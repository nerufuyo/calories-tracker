import {db} from '../utils/firebaseInit.js';
import {
  addDoc,
  getDocs,
  query,
  orderBy,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import UserDb from './UserDb.js';

const colRef = collection(db, 'goals');

const GoalDb = {
  async get() {
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);

    const goals = [];

    snapshot.docs.forEach(doc => {
      let endDate = doc.data().endDate ? doc.data().endDate.toDate() : null;
      goals.push({ 
        ...doc.data(), 
        startDate: doc.data().startDate.toDate(), 
        endDate: endDate,
        id: doc.id })
    })

    return goals;
  },

  async add({calories, startDate, endDate}) {
    const user = await UserDb.getUserAuth();

    endDate = endDate ? new Date(endDate) : null;

    return await addDoc(colRef, {
      calories: parseInt(calories),
      startDate: new Date(startDate),
      endDate,
      createdAt: new Date(),
      uid: user.uid,
    });
  }
}

export default GoalDb;