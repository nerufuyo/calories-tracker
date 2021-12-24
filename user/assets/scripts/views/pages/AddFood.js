import AddFoodView from './addFood/AddFoodView.js';
import AddFoodPresenter from './addFood/AddFoodPresenter.js';
import UrlParser from '../../routes/UrlParser.js';
import FoodDiaryDb from '../../data/FoodDiaryDb.js';
import FoodAPI from '../../data/FoodAPI.js';

const view = new AddFoodView();

const AddFood = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    new AddFoodPresenter({view, defaultDate: url.id, FoodDiaryDb, FoodAPI});
  },
};

export default AddFood;
