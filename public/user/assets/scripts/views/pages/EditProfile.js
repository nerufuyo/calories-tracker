import EditProfilePresenter from './editProfile/EditProfilePresenter.js';
import EditProfileView from './editProfile/EditProfileView.js';
import UserDb from '../../data/UserDb.js';
import UserProfileNameHeaderGenerator from '../../utils/UserProfileNameHeaderGenerator.js';

const view = new EditProfileView();

const EditProfile = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    new EditProfilePresenter({view, UserDb, UserProfileNameHeaderGenerator});
  },
};

export default EditProfile;
