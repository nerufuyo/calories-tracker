class EditProfileView {
  getTitleTemplate() {
    return `
      <i class="fas fa-user-edit"></i> Edit Profile
    `;
  }

  getContentTemplate() {
    return `
      <form class="edit-profile-form">
        <div class="edit-profile-photo__container">
          <img src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png"></img>
          <input type="file" class="user-photo-input">
        </div>
        <div class="edit-profile-input__container">
          <label>
            <div class="input-group">
              <span class="input-name">Name</span>
              <div class="form-input"></div>
              <input type="text" placeholder="Enter your name" class="name-input">
            </div>
            <div class="input-group">
              <span>Gender</span>
              <div>
              
              </div>
            </div>
          </label>
        </div>
      </form>
    `;
  }
}

export default EditProfileView;