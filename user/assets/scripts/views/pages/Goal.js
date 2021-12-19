import GoalView from './goal/GoalView.js';
import GoalPresenter from './goal/GoalPresenter.js';
import UrlParser from '../../routes/UrlParser.js';
import GoalDb from '../../data/GoalDb.js';
import UserDb from '../../data/UserDb.js';

const view = new GoalView();

const Goal = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    new GoalPresenter({view, date: url.id, UserDb, GoalDb});
  },
};

export default Goal;
