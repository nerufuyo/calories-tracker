import EditProfilePresenter from './editProfile/EditProfilePresenter.js';
import EditProfileView from './editProfile/editProfileView.js';
import UserDb from '../../data/UserDb.js';

const view = new EditProfileView();

const EditProfile = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    new EditProfilePresenter({view, UserDb});
  },
};

export default EditProfile;
