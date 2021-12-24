class EditPasswordPresenter {
  constructor({view, UserDb}) {
    this._view = view;
    this._userDb = UserDb;
    this._listenToEditPasswordForm();
  }

  _listenToEditPasswordForm() {
    this._view.editPasswordFormListener(async ({oldPassword, newPassword, confirmPassword}) => {
      if (newPassword.value.trim() !== confirmPassword.value.trim()) {
        this._displayAlertError('Password does not match');
        return;
      }

      await this._userDb.reauthenticate(oldPassword.value.trim())
        .then(async () => {
          await this._userDb.updatePassword(newPassword.value.trim())
          .then(() => {
            this._displayAlertSuccess();
            newPassword.value = '';
            oldPassword.value = '';
            confirmPassword.value = '';
          })
          .catch((error) => {
            this._displayAlertError(error.message);
          });
        })
        .catch((error) => {
          this._displayAlertError(error.message);
        });
    });
  }

  _displayAlertSuccess() {
    this._view.showAlert((alert) => {
      alert.classList.add('active', 'alert-success');
      alert.innerHTML = 'Password has been updated';
    })

    setTimeout(this._hiddenAlert.bind(this), 3000);
  }

  _displayAlertError(error) {
    this._view.showAlert((alert) => {
      alert.classList.add('active', 'alert-error');
      alert.innerHTML = `Error: ${error}`;
    })

    setTimeout(this._hiddenAlert.bind(this), 3000);
  }

  _hiddenAlert() {
    this._view.showAlert((alert) => {
      alert.classList.remove('active', 'alert-success', 'alert-error');
      alert.innerHTML = '';
    })
  }
}

export default EditPasswordPresenter;