class EditProfileView {
  getTitleTemplate() {
    return `
      <i class="fas fa-user-edit"></i> Edit Profile</a>
    `;
  }

  getContentTemplate() {
    return `
      <div class="alert">
      </div>
      <form class="edit-profile__form">
        <div class="profile-photo__container">
          <img src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png" class="user-photo">
          <input type="file" class="user-photo-input"> 
        </div>
        <div class="user-profile__container">
          <label>
            <div class="input-group user-fullname__input">
              <div class="input-name">Name</div>
              <div class="form-input"><input type="text" placeholder="Enter your name" class="user-fullname" required></div>
            </div>
          </label>
          <label>
            <div class="input-group user-gender__input">
              <div class="input-name">Gender</div>
              <div class="form-input">
                <select class="user-gender">
                  <option selected>Choose your gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </label>
          <label>
            <div class="input-group date__input">
              <div class="input-name">Birthday</div>
              <div class="form-input"><input type="date" class="user-birthday" required></div>
            </div>
          </label>
          <label>
            <div class="input-group user-height__input">
              <div class="input-name">Height</div>
              <div class="form-input"><input type="number" placeholder="Enter your height" min="0" class="user-height" required></div>
              <div>cm</div>
            </div>
          </label>
          <label>
            <div class="input-group user-weight__input">
              <div class="input-name">Weight</div>
              <div class="form-input"><input type="number" placeholder="Enter your weight" min="0" class="user-weight" required></div>
              <div>kg</div>
            </div>
          </label>
          <label>
            <div class="input-group user-email__input">
              <div class="input-name">Email</div>
              <div class="form-input"><input type="email" placeholder="Enter your email" class="user-email" required></div>
            </div>
          </label>
          <div class="edit-profile-button__container">
            <button type="submit" class="edit-profile-button" ><i class="far fa-edit"></i> Update Profile</button>
          </div>
        </div>
      </form>
    `;
  }
  
  editFormListener(callback) {
    document.querySelector('.edit-profile__form').addEventListener('submit', (event) => {
      callback({
        name: document.querySelector('.user-fullname'),
        gender: document.querySelector('.user-gender'),
        birthday: document.querySelector('.user-birthday'),
        height: document.querySelector('.user-height'),
        weight: document.querySelector('.user-weight'),
        email: document.querySelector('.user-email'),
      })
      event.preventDefault();
    })
  }

  showFormData(callback) {
    callback({
      name: document.querySelector('.user-fullname'),
      gender: document.querySelector('.user-gender'),
      birthday: document.querySelector('.user-birthday'),
      height: document.querySelector('.user-height'),
      weight: document.querySelector('.user-weight'),
    })
  }

  showEmail(callback) {
    callback(document.querySelector('.user-email'));
  }

  showAlert(callback) {
    callback(document.querySelector('.alert'));
  }
}

export default EditProfileView;
