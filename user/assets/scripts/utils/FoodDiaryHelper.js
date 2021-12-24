import FoodDiaryDb from '../data/FoodDiaryDb.js';

const FoodDiaryHelper = {
  async getCaloriesByRange({startDate, endDate, foodDiaries}) {
    let [breakfastCalories, lunchCalories, dinnerCalories, snackCalories] = [0, 0, 0, 0];

    if (!foodDiaries) {
      foodDiaries = await FoodDiaryDb.getByDateRange({startDate, endDate})
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    foodDiaries.forEach((foodDiary) => {
      if (foodDiary.date.getTime() >= startDate.getTime() && foodDiary.date.getTime() <= endDate.getTime()) {
        if (foodDiary.category === 'Breakfast') {
          breakfastCalories += foodDiary.calories;
        }
        if (foodDiary.category === 'Lunch') {
          lunchCalories += foodDiary.calories;
        }
        if (foodDiary.category === 'Dinner') {
          dinnerCalories += foodDiary.calories;
        }
        if (foodDiary.category === 'Snack') {
          snackCalories += foodDiary.calories;
        }
      }
    });

    return {breakfastCalories, lunchCalories, dinnerCalories, snackCalories};
  },
};


export default FoodDiaryHelper;
