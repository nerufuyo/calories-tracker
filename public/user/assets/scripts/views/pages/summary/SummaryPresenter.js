

class SummaryPresenter{
  constructor(view, FoodDiaryHelper) {
    this._view = view;
    this._foodDiaryHelper = FoodDiaryHelper;

    this._listenToDateRange();
    this._listenToResetButton();
  }

  _listenToDateRange() {
    this._view.dateRangeListener(async ({dateSince, dateUntil}) => {
      if (dateSince.value && dateUntil.value) {
        const calories = await this._foodDiaryHelper.getCaloriesByRange({startDate: dateSince.value, endDate: dateUntil.value});

        let totalCalories = 0;
        for (const property in calories) {
          totalCalories += calories[property];
        }

        this._displaySummaryData({calories, totalCalories});
      }
    })
  }

  _listenToResetButton() {
    this._view.resetButtonListener(({dateSince, dateUntil}) => {
      dateSince.value = null;
      dateUntil.value = null;

      const calories = {
        breakfastCalories: 0,
        lunchCalories: 0,
        dinnerCalories: 0,
        snackCalories: 0,
      }

      const totalCalories = 0;

      this._displaySummaryData({calories, totalCalories})
    });
  }

  _displaySummaryData({calories, totalCalories}) {
    this._view.showSummaryData(({
      breakfastCalories,
      breakfastPercentage,
      lunchCalories,
      lunchPercentage,
      dinnerCalories,
      dinnerPercentage,
      snackCalories,
      snackPercentage
    }) => {
      breakfastCalories.innerHTML = calories.breakfastCalories;
      lunchCalories.innerHTML = calories.lunchCalories;
      dinnerCalories.innerHTML = calories.dinnerCalories;
      snackCalories.innerHTML = calories.snackCalories;

      if (totalCalories) {
        breakfastPercentage.innerHTML = ((calories.breakfastCalories / totalCalories) * 100).toFixed(2);
        lunchPercentage.innerHTML = ((calories.lunchCalories / totalCalories) * 100).toFixed(2);
        dinnerPercentage.innerHTML = ((calories.dinnerCalories / totalCalories) * 100).toFixed(2);
        snackPercentage.innerHTML = ((calories.snackCalories / totalCalories) * 100).toFixed(2);
      } else {
        breakfastPercentage.innerHTML = 0;
        lunchPercentage.innerHTML = 0;
        dinnerPercentage.innerHTML = 0;
        snackPercentage.innerHTML = 0;
      }
    })
  }
}

export default SummaryPresenter;