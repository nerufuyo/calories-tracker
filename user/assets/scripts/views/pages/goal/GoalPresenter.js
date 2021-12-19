import DateHelper from "../../../utils/DateHelper.js";

class GoalPresenter {
  constructor({view, date, UserDb, GoalDb}) {
    this._view = view;
    this._date = date || null;
    this._userDb = UserDb,
    this._goalDb = GoalDb;

    this._listenToShowEndDateButton();
    this._listenToCloseButton();
    this._generateFormValue();
    this._listenToGoalForm();
    this._getGoal();
  }

  _generateFormValue() {
    this._view.showFormValue( async ({activity, startDate, endDate, showEndDateButton}) => {
      activity.value = (await this._userDb.getUser()).activity || 'Sedentary';
      startDate.value = this._date || DateHelper.getYYYYMMDD(new Date());

      if (this._date) {
        showEndDateButton.click();
        endDate.value = this._date;
      }
    })
  }

  _listenToShowEndDateButton() {
    this._view.showEndDateButtonListener(({endDateContainer, endDateInput, showEndDateContainer}) => {
      endDateContainer.style.display = 'flex';
      endDateInput.required = true;
      showEndDateContainer.style.display = 'none';
      this._listenToCloseButton();
    });
  }

  _listenToCloseButton() {
    this._view.closeButtonListener(({endDateContainer, endDateInput, showEndDateContainer}) => {
      endDateContainer.style.display = 'none';
      endDateInput.required = false;
      endDateInput.value = null;
      showEndDateContainer.style.display = 'flex';
      this._listenToShowEndDateButton();
    });
  }

  _listenToGoalForm() {
    this._view.goalFormListener(async ({startDate, endDate, calories}) => {
      await this._goalDb.add({
        calories: calories.value,
        startDate: startDate.value,
        endDate: endDate.value
      })
        .then(() => {
          calories.value = null;
          startDate.value = null;
          endDate.value = null;
        })
    });
  }
}

export default GoalPresenter;