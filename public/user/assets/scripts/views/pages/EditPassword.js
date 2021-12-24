import EditPasswordPresenter from './edit-password/EditPasswordPresenter.js';
import UserDb from '../../data/UserDb.js';
import EditPasswordView from './edit-password/EditPasswordView.js';

const view = new EditPasswordView;

const EditPassword = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    new EditPasswordPresenter({view, UserDb})
  },
};

export default EditPassword;
