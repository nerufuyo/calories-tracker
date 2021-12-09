import foodDiaryDummy from "./foodDiaryDummy.js";

const FoodDiaryData = {
  async getById(id) {
    if (!id) {
      return;
    }

    return foodDiaryDummy.find(food => food.id === id);
  }
}

export default FoodDiaryData;