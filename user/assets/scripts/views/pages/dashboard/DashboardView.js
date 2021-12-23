import DateHelper from '../../../utils/DateHelper.js';

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
          <a class="previous-month"><i class="fas fa-angle-left"></i></a>
          <a class="next-month"><i class="fas fa-angle-right"></i></a>
          <div class="selected-month"></div>
        </div>
        <div class="bmi">
          Your BMI: <span class="bmi-data"></span>
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
        </div>
      </div>
    `;
  };

  showMonthYear(callback) {
    callback(document.querySelector('.selected-month'));
  }

  monthPickerDate(callback) {
    callback({
      previousMonth: document.querySelector('.previous-month'),
      nextMonth: document.querySelector('.next-month'),
    });
  }

  showCalendar(callback) {
    callback(document.querySelector('.calendar-date'));
  };

  showCalendarCurrentMonth(date) {
    const d = date ? new Date(date) : new Date();

    const dYYYYMMDD = DateHelper.getYYYYMMDD(d);

    const dSplit = dYYYYMMDD.split('-');

    let daysTemplate = '';
    for (let i = 1; i <= d.getMonthDays(); i++) {
      daysTemplate += `
        <a href="#/food-diary/${dSplit[0]}-${dSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid current-month _${dSplit[0]}-${dSplit[1]}-${i.toString().padStart(2, '0')}" data-date="${dSplit[0]}-${dSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}<span> <span class="month-first-date">${i === 1 ? DateHelper.getMonthName(dYYYYMMDD).slice(0, 3) : ''}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span> / <span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return daysTemplate;
  }

  showCalendarPreviousMonth(date) {
    const d = date ? new Date(date) : new Date();

    const remainingDays = DateHelper.previousMonthRemainingDays(DateHelper.getYYYYMMDD(d));
    const dPreviousYYYYMMDD = DateHelper.getPreviousMonth(DateHelper.getYYYYMMDD(d));
    const dPreviousDate = new Date(dPreviousYYYYMMDD);
    const dPreviousSplit = dPreviousYYYYMMDD.split('-');

    let remainingDaysTemplate = '';
    for (let i = dPreviousDate.getMonthDays() - remainingDays + 1; i <= dPreviousDate.getMonthDays(); i++) {
      remainingDaysTemplate += `
        <a href="#/food-diary/${dPreviousSplit[0]}-${dPreviousSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid not__current-month _${dPreviousSplit[0]}-${dPreviousSplit[1]}-${i.toString().padStart(2, '0')}" data-date="${dPreviousSplit[0]}-${dPreviousSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span> / <span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return remainingDaysTemplate;
  }

  showCalendarNextMonth(date) {
    const d = date ? new Date(date) : new Date();

    const remainingDays = DateHelper.nextMonthRemainingDays(DateHelper.getYYYYMMDD(d));
    const dNextYYYYMMDD = DateHelper.getNextMonth(DateHelper.getYYYYMMDD(d));
    const dNextSplit = dNextYYYYMMDD.split('-');

    let remainingDaysTemplate = '';
    for (let i = 1; i <= remainingDays; i++) {
      remainingDaysTemplate += `
        <a href="#/food-diary/${dNextSplit[0]}-${dNextSplit[1]}-${i.toString().padStart(2, '0')}" class="date-grid not__current-month _${dNextSplit[0]}-${dNextSplit[1]}-${i.toString().padStart(2, '0')}" data-date="${dNextSplit[0]}-${dNextSplit[1]}-${i.toString().padStart(2, '0')}">
          <div class="date-number"><span class="date-order">${i.toString().padStart(2, '0')}</span> <span class="first-date">${i === 1 ? DateHelper.getMonthName(dNextYYYYMMDD).slice(0, 3) : ''}</span></div>
          <div class="calories__this-day"><span class="total-calories__this-day"></span> / <span class="calories-goal__this-day"></span></div>
        </a>
      `;
    }

    return remainingDaysTemplate;
  }

  showCurrentDate(callback) {
    callback(document.querySelector(`.calendar-date`));
  }

  showCalendarData(callback) {
    callback(document.querySelectorAll('.date-grid'));
  }
}

export default DashboardView;
