import DateHelper from '../../../utils/DateHelper.js';

class AddFoodPresenter {
  constructor({view, defaultDate}) {
    this._view = view;
    this._defaultDate = defaultDate || DateHelper.getYYYYMMDD(new Date());

    this._inputDateDefaultValue();
  }

  _inputDateDefaultValue() {
    this._view.generateInputDateValue((inputDateElement) => {
      inputDateElement.value = this._defaultDate;
    });
  }
}

export default AddFoodPresenter;
