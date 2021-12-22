import DateHelper from '../../../utils/DateHelper.js';
import UrlParser from '../../../routes/UrlParser.js';
import GoalHelper from '../../../utils/GoalHelper.js';
import FoodDiaryHelper from '../../../utils/FoodDiaryHelper.js';

class DashboardPresenter {
  constructor({FoodDiaryDb, UserDb, GoalDb, view, date}) {
    this._view = view;
    this._userDb = UserDb;
    this._foodDiaryDb = FoodDiaryDb;
    this._goalDb = GoalDb;
    this._date = date || DateHelper.getYYYYMMDD(new Date());

    this._displayMonthYear();
    this._generateMonthPickerDate();
    this._displayCalendar();
    this._displayCurrentDate();
    this._displayCalendarData();
    
    // this._showGoal();
    // this._view.showFoodCalories();
  }

  _displayMonthYear() {
    this._view.showMonthYear((selectedMonth) => {
      selectedMonth.innerHTML = `${DateHelper.getMonthName(this._date)} ${DateHelper.getYear(this._date)}`;
    })
  }

  _generateMonthPickerDate() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this._view.monthPickerDate(({previousMonth, nextMonth}) => {
      previousMonth.href = `#/${url.resource}/${DateHelper.getPreviousMonth(this._date)}`;
      nextMonth.href =  `#/${url.resource}/${DateHelper.getNextMonth(this._date)}`;
    })
  }

  _displayCalendar() {
    this._view.showCalendar((calendarElement) => {
      calendarElement.innerHTML = `
        ${this._view.showCalendarPreviousMonth(this._date)}
        ${this._view.showCalendarCurrentMonth(this._date)}
        ${this._view.showCalendarNextMonth(this._date)}
      `;
    })
  }

  _displayCurrentDate() {
    this._view.showCurrentDate((calendarElement) => {
      const currentDateElement = calendarElement.querySelector(`._${DateHelper.getYYYYMMDD(new Date())}`);

      if (currentDateElement) {
        const thisDate = currentDateElement.querySelector('.date-order');

        thisDate.classList.add('current-date');
      }
    });
  }

  _displayCalendarData() {
    this._view.showCalendarData(async (dateElements) => {
      let startDate = new Date(this._date);
      let endDate = new Date(this._date);

      startDate.setDate(1 - DateHelper.previousMonthRemainingDays(this._date));
      endDate.setDate(endDate.getMonthDays() + DateHelper.nextMonthRemainingDays(this._date));

      startDate = DateHelper.getYYYYMMDD(startDate);
      endDate = DateHelper.getYYYYMMDD(endDate);

      const goals = await this._goalDb.get();
      const foodDiaries = await this._foodDiaryDb.getByDateRange({startDate, endDate});

      // await FoodDiaryHelper.getCaloriesByRange({foodDiaries, startDate: '2021-12-21', endDate: '2021-12-21'})

      dateElements.forEach(async (dateElement) => {
        const goal = await GoalHelper.getGoal({date: dateElement.dataset.date, goals});
        const calories = await FoodDiaryHelper.getCaloriesByRange({foodDiaries, startDate: dateElement.dataset.date, endDate: dateElement.dataset.date});

        dateElement.querySelector('.calories-goal__this-day').innerHTML = goal;
        dateElement.querySelector('.total-calories__this-day').innerHTML = 
          calories.breakfastCalories + calories.lunchCalories + calories.dinnerCalories + calories.snackCalories;
      })
    });
  }
}

export default DashboardPresenter;
