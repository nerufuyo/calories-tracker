import FoodDiaryView from "./foodDiary/FoodDiaryView.js";

const view = new FoodDiaryView();

const FoodDiary = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate() };
  },

  async afterRender(){
    return '';
  }
}

export default FoodDiary;