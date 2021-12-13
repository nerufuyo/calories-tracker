import GoalView from "./goal/GoalView.js";

const view = new GoalView();

const Goal = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    return ``;
  }
}

export default Goal;