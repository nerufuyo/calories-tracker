import SummaryView from './summary/SummaryView.js';

const view = new SummaryView();

const Summary = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    return ``;
  },
};

export default Summary;
