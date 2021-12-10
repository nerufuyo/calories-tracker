import DateHelper from "../../../utils/DateHelper.js";

class DashboardView {
  getTitleTemplate() {
    return `
      <i class="fas fa-chart-pie"></i> Dashboard
    `;
  }

  getContentTemplate() {
    return `
      <div class="dashboard-top">
        <div class="month-picker">
          <div class="previous-month" data-date="${DateHelper.getPreviousMonth()}"><i class="fas fa-angle-left"></i></div>
          <div class="next-month" data-date="${DateHelper.getNextMonth()}"><i class="fas fa-angle-right"></i></div>
          <div class="selected-month">${DateHelper.getMonthName()} ${DateHelper.getYear()}</div>
        </div>
        <div class="bmi">
          Your BMI: <span class="bmi-data">19 (Healthy)</span>
        </div>
        <div class="calories-goal">
          Goal: <span class="calories-goal-data"></span> / day
        </div>
      </div>
      <div class="calendar">
        <div class="calendar-days">
          <div class="day-name">Sun</div>
          <div class="day-name">Mon</div>
          <div class="day-name">Tue</div>
          <div class="day-name">Wed</div>
          <div class="day-name">Thu</div>
          <div class="day-name">Fri</div>
          <div class="day-name">Sat</div>
        </div>
        <div class="calendar-date">
          ${this._getCalendarDatePreviousMonth()}
          ${this._getCalendarDateCurrentMonth()}
          ${this._getCalendarDateNextMonth()}
        </div>
      </div>
    `;
  };

  monthPickerListener(callback) {
    document.querySelector('.previous-month').addEventListener('click', (event) => {
      callback(event.target.dataset.date);
    })

    document.querySelector('.next-month').addEventListener('click', (event) => {
      callback(event.target.dataset.date);
    })
  }

  monthPickerDate(date) {
    document.querySelector('.previous-month').dataset.date = DateHelper.getPreviousMonth(date);
    document.querySelector('.next-month').dataset.date = DateHelper.getNextMonth(date);
  }

  showCurrentMonthYear(date) {
    document.querySelector('.selected-month').innerHTML = `${DateHelper.getMonthName(date)} ${DateHelper.getYear(date)}`;
  }

  getCalendarDateTemplate(date) {
    const d = date ? new Date(date) : new Date();

    const calendarDateElement = document.querySelector('.calendar-date');

    calendarDateElement.innerHTML = `
      ${this._getCalendarDatePreviousMonth(DateHelper.getYYYYMMDD(d))}
      ${this._getCalendarDateCurrentMonth(DateHelper.getYYYYMMDD(d))}
      ${this._getCalendarDateNextMonth(DateHelper.getYYYYMMDD(d))}
    `;
  };

  _getCalendarDateCurrentMonth(date) {
    const d = date ? new Date(date) : new Date();

    const dYYYYMMDD = DateHelper.getYYYYMMDD(d);

    const dSplit = dYYYYMMDD.split('-');

    let daysTemplate = '';
    for (let i = 1; i <= d.getMonthDays(); i++) {
      daysTemplate += `
        <a href="#/food-diary/${dSplit[0]}-${dSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid current-month _${dSplit[0]}-${dSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}<span> <span class="month-first-date">${i === 1 ? DateHelper.getMonthName(dYYYYMMDD).slice(0, 3) : ''}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span><span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return daysTemplate;
  }

  _getCalendarDatePreviousMonth(date) {
    const d = date ? new Date(date) : new Date();

    console.log(d);

    const remainingDays = DateHelper.previousMonthRemainingDays(DateHelper.getYYYYMMDD(d));
    const dPreviousYYYYMMDD = DateHelper.getPreviousMonth(DateHelper.getYYYYMMDD(d));
    const dPreviousDate = new Date(dPreviousYYYYMMDD);
    const dPreviousSplit = dPreviousYYYYMMDD.split('-');
    
    let remainingDaysTemplate = '';
    for (let i = dPreviousDate.getMonthDays() - remainingDays + 1; i <= dPreviousDate.getMonthDays(); i++) {
      remainingDaysTemplate += `
        <a href="#/food-diary/${dPreviousSplit[0]}-${dPreviousSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid not__current-month _${dPreviousSplit[0]}-${dPreviousSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span><span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return remainingDaysTemplate;
  }

  _getCalendarDateNextMonth(date) {
    const d = date ? new Date(date) : new Date();

    const remainingDays = DateHelper.nextMonthRemainingDays(DateHelper.getYYYYMMDD(d));
    const dNextYYYYMMDD = DateHelper.getNextMonth(DateHelper.getYYYYMMDD(d));
    const dNextSplit = dNextYYYYMMDD.split('-');
    
    let remainingDaysTemplate = '';
    for (let i = 1; i <= remainingDays; i++) {
      remainingDaysTemplate += `
        <a href="#/food-diary/${dNextSplit[0]}-${dNextSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid not__current-month _${dNextSplit[0]}-${dNextSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}</span> <span class="first-date">${i === 1 ? DateHelper.getMonthName(dNextYYYYMMDD).slice(0, 3) : ''}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span><span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return remainingDaysTemplate;
  }

  showCurrentDate(date) {
    document.querySelector(`._${date}`).querySelector('.date-order').classList.add('current-date');
  }

  showGoal(goal) {
    document.querySelector('.calories-goal-data').innerHTML = `${goal}`;
    document.querySelectorAll('.calories-goal__this-day').forEach((goalDay) => {
      goalDay.innerHTML = ` / ${goal}`;
    });
  }

  showFoodCalories() {
    document.querySelectorAll('.total-calories__this-day').forEach((caloriesDay) => {
      caloriesDay.innerHTML = `${Math.round(Math.random() * (4000 - 2000)) + 2000}`;
    })
  }
}

export default DashboardView;