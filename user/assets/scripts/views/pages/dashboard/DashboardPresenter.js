import DateHelper from '../../../utils/DateHelper.js';

class DashboardPresenter {
  constructor({foodDiary, user, view}) {
    this._view = view;
    this._user = user;
    this._foodDiary = foodDiary;

    this._listenToMonthPicker();
    this._showGoal();
    this._view.showFoodCalories();
    this._showCurrentDate();
  }

  _listenToMonthPicker() {
    this._view.monthPickerListener((date) => {
      this._view.monthPickerDate(date);
      this._view.showCurrentMonthYear(date);
      this._view.getCalendarDateTemplate(date);
      this._showGoal(3000);
      this._view.showFoodCalories();
      this._showCurrentDate();
    });
  }

  _showCurrentDate() {
    this._view.showCurrentDate(DateHelper.getYYYYMMDD(new Date()));
  }

  _showGoal() {
    this._view.showGoal(3000);
  }
}

export default DashboardPresenter;
