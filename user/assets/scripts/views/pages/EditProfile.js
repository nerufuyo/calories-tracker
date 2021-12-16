import EditProfileView from './editProfile/editProfileView.js';

const view = new EditProfileView();

const EditProfile = {
  async render() {
    return {title: view.getTitleTemplate(), content: view.getContentTemplate()};
  },

  async afterRender() {
    return ``;
  },
};

export default EditProfile;
