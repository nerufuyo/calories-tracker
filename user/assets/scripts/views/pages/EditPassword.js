import EditPasswordView from "./edit-password/EditPasswordView.js";

const view = new EditPasswordView;

const EditPassword = {
  async render() {
    return { title: view.getTitleTemplate(), content: view.getContentTemplate() };
  },

  async afterRender() {
    return ``;
  }
}

export default EditPassword;