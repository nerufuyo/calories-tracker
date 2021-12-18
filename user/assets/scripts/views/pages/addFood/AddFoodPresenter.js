import DateHelper from '../../../utils/DateHelper.js';

class AddFoodPresenter {
  constructor({view, defaultDate, FoodDiaryDb}) {
    this._view = view;
    this._defaultDate = defaultDate || DateHelper.getYYYYMMDD(new Date());
    this._foodDiaryDb = FoodDiaryDb;

    this._inputDateDefaultValue();
    this._listenToAddForm();
  }

  _inputDateDefaultValue() {
    this._view.generateInputDateValue((inputDateElement) => {
      inputDateElement.value = this._defaultDate;
    });
  }

  _listenToAddForm() {
    this._view.addFormListener(async ({
      name,
      servingSize,
      calories,
      category,
      date,
    }) => {
      await this._foodDiaryDb.add({
        name: name.value,
        servingSize: servingSize.value,
        calories: calories.value,
        category: category.options[category.selectedIndex].value,
        date: date.value,
      })
          .then(() => {
            name.value = '';
            servingSize.value = '';
            calories.value = '';
          });
    });
  }
}

export default AddFoodPresenter;
