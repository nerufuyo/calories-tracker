import DashboardView from "./dashboard/DashboardView.js";
import DashboardPresenter from "./dashboard/DashboardPresenter.js";
import FoodDiaryData from '../../data/FoodDiaryData.js';
import UserData from '../../data/UserData.js';

const view = new DashboardView();

const Dashboard = {
  async render() {

    return { title: view.getTitleTemplate(), content: view.getContentTemplate() };
  },

  async afterRender() {
    new DashboardPresenter({
      foodDiary: FoodDiaryData,
      user: UserData,
      view
    });
  }
}

export default Dashboard;