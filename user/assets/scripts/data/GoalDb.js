import {db} from '../utils/firebaseInit.js';
import {
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import UserDb from './UserDb.js';

const colRef = collection(db, 'goals');

const GoalDb = {
  async get() {
    const user = await UserDb.getUserAuth();

    const q = query(colRef, orderBy('createdAt', 'desc'), where('uid', '==', user.uid));

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