import SummaryView from './summary/SummaryView.js';
import SummaryPresenter from './summary/SummaryPresenter.js';
import FoodDiaryHelper from '../../utils/FoodDiaryHelper.js';

const view = new SummaryView();

const Summary = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    new SummaryPresenter(view, FoodDiaryHelper);
  },
};

export default Summary;
