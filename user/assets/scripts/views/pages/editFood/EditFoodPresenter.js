import DateHelper from '../../../utils/DateHelper.js';

class EditFoodPresenter {
  constructor({view, foodId, FoodDiaryDb}) {
    this._view = view;
    this._foodId = foodId;
    this._foodDiaryDb = FoodDiaryDb;

    this._generateFoodData();
    this._listenToEditForm();
  }

  async _generateFoodData() {
    const foodDiary = await this._foodDiaryDb.getById(this._foodId);

    this._view.showFoodData({
      name: foodDiary.data().name,
      servingSize: foodDiary.data().servingSize,
      calories: foodDiary.data().calories,
      category: foodDiary.data().category,
      date: DateHelper.getYYYYMMDD(foodDiary.data().date.toDate()),
    });
  }

  async _listenToEditForm() {
    this._view.editFormListener(async ({
      name,
      servingSize,
      calories,
      category,
      date,
    }) => {
      await this._foodDiaryDb.update({
        id: this._foodId,
        name: name.value,
        servingSize: servingSize.value,
        calories: calories.value,
        category: category.options[category.selectedIndex].value,
        date: date.value,
      })
      
      this._displayAlertSuccess();
    });
  }

  _displayAlertSuccess() {
    this._view.showAlert((alert) => {
      alert.classList.add('active', 'alert-success');
      alert.innerHTML = 'Data has been updated';
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

export default EditFoodPresenter;
