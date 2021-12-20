import FoodDiaryPresenter from './foodDiary/FoodDiaryPresenter.js';
import FoodDiaryView from './foodDiary/FoodDiaryView.js';
import UserDb from '../../data/UserDb.js';
import FoodDiaryDb from '../../data/FoodDiaryDb.js';
import GoalDb from '../../data/GoalDb.js';
import UrlParser from '../../routes/UrlParser.js';

const view = new FoodDiaryView();

const FoodDiary = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    new FoodDiaryPresenter({view, UserDb, FoodDiaryDb, GoalDb, date: url.id});
  },
};

export default FoodDiary;
