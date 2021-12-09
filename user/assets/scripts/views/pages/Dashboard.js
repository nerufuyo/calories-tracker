import DashboardView from "./dashboard/DashboardView.js";

const view = new DashboardView();

const Dashboard = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate() };
  },
}

export default Dashboard;