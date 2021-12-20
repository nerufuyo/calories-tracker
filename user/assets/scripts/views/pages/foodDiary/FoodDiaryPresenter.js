import DateHelper from '../../../utils/DateHelper.js';
import UrlParser from '../../../routes/UrlParser.js';
import GoalHelper from '../../../utils/GoalHelper.js';

class FoodDiaryPresenter {
  constructor({
    view,
    UserDb, 
    FoodDiaryDb,
    GoalDb,
    date,
  }) {
    this._view = view;
    this._userDb = UserDb;
    this._foodDiaryDb = FoodDiaryDb;
    this._goalDb = GoalDb;
    this._date = date || DateHelper.getYYYYMMDD(new Date());

    this._generateDatePicker();
    this._generateDatePickerButton();
    this._listenToDatePicker();
    this._generateAddFoodLink();
    this._generateSetGoalLink();
    this._generateDay();
    this._generateFood();
  }

  _generateDatePicker() {
    this._view.showDatePicker(({datePicker}) => {
      datePicker.value = this._date;
    })
  }

  _generateDay() {
    this._view.showDay((dayElement) => {
      const today = DateHelper.getYYYYMMDD(new Date());

      if (today === this._date) {
        dayElement.innerHTML = 'Today';
        return;
      }

      if (DateHelper.getPreviousDate(today) === this._date) {
        dayElement.innerHTML = 'Yesterday';
        return;
      }

      if (DateHelper.getNextDate(today) === this._date) {
        dayElement.innerHTML = 'Tomorrow';
        return;
      }

      dayElement.innerHTML = DateHelper.getDayName(this._date);
    })
  }

  _listenToDatePicker() {
    this._view.datePickerListener((event) => {
      this._date = event.target.value;
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      window.location.href = `#/${url.resource}/${this._date}`;
    })
  }

  _generateDatePickerButton() {
    this._view.showDatePickerButton(({datePickerNext, datePickerPrevious}) => {
      const d = this._date;
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      datePickerNext.href = `#/${url.resource}/${DateHelper.getNextDate(d)}`;
      datePickerPrevious.href = `#/${url.resource}/${DateHelper.getPreviousDate(d)}`;
    })
  }
  
  async _generateCaloriesRemaining(foodCalories) {
    const goalCalories = await GoalHelper.getGoal(this._date);

    this._view.showCaloriesRemaining(({
      goalCaloriesElement,
      foodCaloriesElement,
      remainingCaloriesElement,
    }) => {
      const remainingCalories = goalCalories - foodCalories;

      goalCaloriesElement.innerHTML = goalCalories;
      foodCaloriesElement.innerHTML = foodCalories;
      remainingCaloriesElement.innerHTML = remainingCalories < 0 ? '0' : remainingCalories;
    });
  }

  async _generateFood() {
    const FoodDiaries = await this._foodDiaryDb.getByDateRange({startDate: this._date, endDate: this._date});
    
    this._generateBreakfast({data: this._view.foodDataTemplate('')});
    this._generateLunch({data: this._view.foodDataTemplate('')});
    this._generateDinner({data: this._view.foodDataTemplate('')});
    this._generateSnack({data: this._view.foodDataTemplate('')});

    let [breakfastTotal, breakfastList, lunchTotal, lunchList, dinnerTotal, dinnerList,
      snackTotal, snackList] = [0, '', 0, '', 0, '', 0, ''];

    FoodDiaries.forEach((foodDiary) => {
      if (foodDiary.category === 'Breakfast') {
        breakfastTotal += foodDiary.calories;
        breakfastList += this._view.foodDataTemplate(foodDiary);
      }
      else if (foodDiary.category === 'Lunch') {
        lunchTotal += foodDiary.calories;
        lunchList += this._view.foodDataTemplate(foodDiary);
      }
      else if (foodDiary.category === 'Dinner') {
        dinnerTotal += foodDiary.calories;
        dinnerList += this._view.foodDataTemplate(foodDiary);
      }
      else if (foodDiary.category === 'Snack') {
        snackTotal += foodDiary.calories;
        snackList += this._view.foodDataTemplate(foodDiary);
      }
    });

    breakfastList = breakfastList || this._view.foodDataTemplate('')
    lunchList = lunchList || this._view.foodDataTemplate('')
    dinnerList = dinnerList || this._view.foodDataTemplate('')
    snackList = snackList || this._view.foodDataTemplate('')

    this._generateBreakfast({
      totalCalories: breakfastTotal,
      data: breakfastList,
    });

    this._generateLunch({
      totalCalories: lunchTotal,
      data: lunchList,
    });

    this._generateDinner({
      totalCalories: dinnerTotal,
      data: dinnerList,
    });

    this._generateSnack({
      totalCalories: snackTotal,
      data: snackList,
    });

    this._listenToDeleteFood();

    await this._generateCaloriesRemaining(breakfastTotal + lunchTotal + dinnerTotal + snackTotal);    
  }

  _generateBreakfast({totalCalories, data}) {
    this._view.showBreakfast(({breakfastTotal, breakfastData}) => {
      breakfastTotal.innerHTML = totalCalories || '-';
      breakfastData.innerHTML = data;
    });
  }

  _generateLunch({totalCalories, data}) {
    this._view.showLunch(({lunchTotal, lunchData}) => {
      lunchTotal.innerHTML = totalCalories || '-';
      lunchData.innerHTML = data;
    });
  }

  _generateDinner({totalCalories, data}) {
    this._view.showDinner(({dinnerTotal, dinnerData}) => {
      dinnerTotal.innerHTML = totalCalories || '-';
      dinnerData.innerHTML = data;
    });
  }

  _generateSnack({totalCalories, data}) {
    this._view.showSnack(({snackTotal, snackData}) => {
      snackTotal.innerHTML = totalCalories || '-';
      snackData.innerHTML = data;
    });
  }

  _listenToDeleteFood() {
    this._view.deleteFoodListener((deleteButtons) => {
      deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          this._displayModal(event.target.dataset.id);
        })
      });
    })
  }

  _displayModal(id) {
    this._view.showModal(({modal, deleteConfirm}) => {
      modal.style.display = 'block';

      deleteConfirm.addEventListener('click', async () => {
        await this._foodDiaryDb.delete(id);
        await this._generateFood();
      })
    })
  }

  _generateAddFoodLink() {
    this._view.showAddFoodLink((addFoodLinkElement) => {
      addFoodLinkElement.href = `#/add-food/${this._date}`;
    })
  }

  _generateSetGoalLink() {
    this._view.showSetGoalLink((setGoalLinkElement) => {
      setGoalLinkElement.href = `#/goal/${this._date}`;
    })
  }
}

export default FoodDiaryPresenter;