class EditProfileView {
  getTitleTemplate() {
    return `
      <i class="fas fa-user-edit"></i> Edit Profile</a>
    `;
  }

  getContentTemplate() {
    return `
      <form class="edit-profile__form">
        <div class="profile-photo__container">
          <img src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_960_720.png" class="user-photo">
          <input type="file" class="user-photo-input"> 
        </div>
        <div class="user-profile__container">
          <label>
            <div class="input-group user-fullname__input">
              <div class="input-name">Name</div>
              <div class="form-input"><input type="text" placeholder="Enter your name" value="Imam Firdaus Dwimeianto" class="user-fullname" required></div>
            </div>
          </label>
          <label>
            <div class="input-group user-gender__input">
              <div class="input-name">Gender</div>
              <div class="form-input">
                <select class="user-gender">
                  <option value="Male" selected>Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </label>
          <label>
            <div class="input-group date__input">
              <div class="input-name">Birthday</div>
              <div class="form-input"><input type="date" class="user-birthday" value="2000-05-15" required></div>
            </div>
          </label>
          <label>
            <div class="input-group user-height__input">
              <div class="input-name">Height</div>
              <div class="form-input"><input type="number" placeholder="Enter your height" value="175" min="0" class="user-height" required></div>
              <div>cm</div>
            </div>
          </label>
          <label>
            <div class="input-group user-weight__input">
              <div class="input-name">Weight</div>
              <div class="form-input"><input type="number" placeholder="Enter your weight" value="55" min="0" class="user-weight" required></div>
              <div>kg</div>
            </div>
          </label>
          <label>
            <div class="input-group user-username__input">
              <div class="input-name">Username</div>
              <div class="form-input"><input type="text" placeholder="Enter your username" value="idwimeianto" class="user-username" required></div>
            </div>
          </label>
          <label>
            <div class="input-group user-email__input">
              <div class="input-name">Email</div>
              <div class="form-input"><input type="text" placeholder="Enter your email" value="idwimeianto@gmail.com" class="user-email" required></div>
            </div>
          </label>
          <div class="edit-profile-button__container">
            <button class="edit-profile-button" ><i class="far fa-edit"></i> Update Profile</button>
          </div>
        </div>
      </form>
    `;
  }
}

export default EditProfileView;
