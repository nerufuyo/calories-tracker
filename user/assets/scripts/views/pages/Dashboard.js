import DashboardView from './dashboard/DashboardView.js';
import DashboardPresenter from './dashboard/DashboardPresenter.js';
import FoodDiaryDb from '../../data/FoodDiaryDb.js';
import GoalDb from '../../data/GoalDb.js';
import UserDb from '../../data/UserDb.js';
import UrlParser from '../../routes/UrlParser.js';

const view = new DashboardView();

const Dashboard = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    new DashboardPresenter({
      FoodDiaryDb,
      UserDb,
      GoalDb,
      view,
      date: url.id,
    });
  },
};

export default Dashboard;
