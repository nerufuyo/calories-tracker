import DashboardView from "./dashboard/DashboardView.js";

const view = new DashboardView();

const Dashboard = {
  async render() {
    return {header: view.getHeadTemplate(), content: view.getContentTemplate};
  },
}

export default Dashboard;