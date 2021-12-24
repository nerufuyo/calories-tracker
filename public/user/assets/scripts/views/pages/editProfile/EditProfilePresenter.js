import DateHelper from "../../../utils/DateHelper.js";

class EditProfilePresenter {
  constructor({view, UserDb, UserProfileNameHeaderGenerator}) {
    this._view = view;
    this._userDb = UserDb;
    this._userHeaderName = UserProfileNameHeaderGenerator;

    this._displayEmail();
    this._displayFormData();
    this._listenToEditForm();
  }

  _displayFormData() {
    this._view.showFormData(async ({name, gender, birthday, height, weight}) => {
      const user = await this._userDb.getUser();

      name.value = user.fullname || '';
      if (user.gender) {
        gender.value = user.gender;
      }
      birthday.value = DateHelper.getYYYYMMDD((user.birthday).toDate()) || '';
      height.value = user.height || '';
      weight.value = user.weight || '';
    })
  }

  _displayEmail() {
    this._view.showEmail(async (emailElement) => {
      emailElement.value = (await this._userDb.getUserAuth()).email;
    })
  }

  _listenToEditForm() {
    this._view.editFormListener(async ({name, gender, birthday, height, weight, email}) => {
      name = (name.value).trim();

      await this._userDb.update({
        fullname: name,
        gender: gender.value,
        birthday: birthday.value,
        height: height.value,
        weight: weight.value,
        email: email.value,
      })
        .then(() => {
          this._displayAlertSuccess();
          this._userHeaderName.init(document.querySelector('.user-profile__name'), this._userDb);
        })
        .catch((err) => {
          this._displayAlertError(err.message);
        });
    })
  }

  _displayAlertSuccess() {
    this._view.showAlert((alert) => {
      alert.classList.add('active', 'alert-success');
      alert.innerHTML = 'Data has been updated';
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

export default EditProfilePresenter;