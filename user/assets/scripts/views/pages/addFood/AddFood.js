import AddFoodView from "./addFood/AddFoodView.js";

const view = new AddFoodView();

const AddFood = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    return '';
  }
}

export default AddFood;