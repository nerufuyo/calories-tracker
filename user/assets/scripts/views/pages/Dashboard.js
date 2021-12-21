import DashboardView from './dashboard/DashboardView.js';
import DashboardPresenter from './dashboard/DashboardPresenter.js';
import FoodDiaryDb from '../../data/FoodDiaryDb.js';
import UserDb from '../../data/UserDb.js';

const view = new DashboardView();

const Dashboard = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    new DashboardPresenter({
      foodDiary: FoodDiaryDb,
      user: UserDb,
      view,
    });
  },
};

export default Dashboard;
