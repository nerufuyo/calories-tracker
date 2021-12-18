import EditFoodView from './editFood/EditFoodView.js';

const view = new EditFoodView();

const EditFood = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    return '';
  },
};

export default EditFood;
