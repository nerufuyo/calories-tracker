class EditPasswordView {
  getTitleTemplate() {
    return `
      <i class="fas fa-key"></i> Edit Password
    `;
  }

  getContentTemplate() {
    return `
      <div class="alert">
      </div>
      <form class="edit-password__form">
        <label>
          <div class="input-group old-password__input">
            <div class="input-name">Old Password</div>
            <div class="form-input"><input type="password" placeholder="Enter your old password" class="old-password" minlength="8" required></div>
          </div>
        </label>
        <label>
          <div class="input-group new-password__input">
            <div class="input-name">New Password</div>
            <div class="form-input"><input type="password" placeholder="Enter your new password" class="new-password" minlength="8" required></div>
          </div>
        </label>
        <label>
          <div class="input-group confirm-password__input">
            <div class="input-name">Confirm Password</div>
            <div class="form-input"><input type="password" placeholder="Enter confirmation password" class="confirm-password" minlength="8" required></div>
          </div>
        </label>
        <div class="edit-password-button__container">
          <button class="edit-password-button" ><i class="far fa-edit"></i> Update Password</button>
        </div>
      </form>
    `;
  }

  editPasswordFormListener(callback) {
    document.querySelector('.edit-password__form').addEventListener('submit', (event) => {
      callback({
        oldPassword: document.querySelector('.old-password'),
        newPassword: document.querySelector('.new-password'),
        confirmPassword: document.querySelector('.confirm-password'),
      })
      event.preventDefault();
    });
  }

  showAlert(callback) {
    callback(document.querySelector('.alert'));
  }
}

export default EditPasswordView;
