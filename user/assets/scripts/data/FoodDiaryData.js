import foodDiaryDummy from './foodDiaryDummy.js';
function compareMonth(fullDate, month) {
  const fullDateToMonth = fullDate.slice(0, 7);

  return fullDateToMonth === month;
}

const FoodDiaryData = {
  async getById(id) {
    if (!id) {
      return;
    }

    return foodDiaryDummy.find((food) => food.id === id);
  },

  async getByDate(date) {
    return foodDiaryDummy.filter((food) => food.date === date);
  },

  async getByMonth(month) {
    return foodDiaryDummy.filter((food) => compareMonth(food.date, month));
  },
};

export default FoodDiaryData;
