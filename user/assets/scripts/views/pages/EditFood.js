import EditFoodView from "./editFood/EditFoodView.js";
import EditFoodPresenter from "./editFood/EditFoodPresenter.js";
import FoodDiaryDb from "../../data/FoodDiaryDb.js";
import UrlParser from "../../routes/UrlParser.js";

const view = new EditFoodView();

const EditFood = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    new EditFoodPresenter({view, foodId: url.id, FoodDiaryDb})
  }
}

export default EditFood;