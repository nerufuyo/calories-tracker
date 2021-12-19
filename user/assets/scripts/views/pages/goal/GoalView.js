import DateHelper from '../../../utils/DateHelper.js';

class GoalView {
  getTitleTemplate() {
    return `
      <i class="fas fa-bullseye"></i> Goal
    `;
  }

  getContentTemplate() {
    return `
      <form class="goal__form">
        <label>
          <div class="input-group activity__input">
            <div class="input-name">Activity</div>
            <div class="form-input">
              <select class="activity-level">
                <option value="Sedentary" selected>Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
        </label>
        <label>
          <div class="input-group date__input">
            <div class="input-name">Start Date</div>
            <div class="form-input">
              <input type="date" class="start-date" required>
            </div>
          </div>
        </label>
        <div class="end-date__container">
          <label>
            <div class="input-group date__input">
              <div class="input-name">End Date</div>
              <div class="form-input">
                <input type="date" class="end-date">
              </div>
            </div>
          </label>
          <div class="close-button" role="button"><i class="fas fa-times"></i></div>
        </div>
        <div class="show-end-date__container">
          <div role="button" class="show-end-date__button">Set End Date</div>
          <div class="info">If end date is not specified, the goal will be applied to all next date</div>
        </div>
        <label>
          <div class="input-group calories-target__input">
            <div class="input-name">Calories</div>
            <div class="form-input"><input type="number" placeholder="Enter your calories target" class="calories-target" min="0" required></div>
            <div>/ day</div>
          </div>
        </label>
        <div class="info"><span>*Calories recommendation according to <a href="https://www.fda.gov/media/112972/download" target="_blank">fda.gov</a></span></div>

        <div class="set-goal-button__container">
          <button type="submit" class="set-goal-button"><i class="far fa-plus-square"></i> Set Goal</button>
        </div>
      </form>
    `;
  }

  showFormValue(callback) {
    callback({
      activity: document.querySelector('.activity-level'),
      startDate: document.querySelector('.start-date'),
      endDate: document.querySelector('.end-date'),
      showEndDateButton: document.querySelector('.show-end-date__button'),
    });
  }

  showEndDateButtonListener(callback) {
    document.querySelector('.show-end-date__button').addEventListener('click', () => {
      callback({
        endDateContainer: document.querySelector('.end-date__container'),
        endDateInput: document.querySelector('.end-date'),
        showEndDateContainer: document.querySelector('.show-end-date__container'),
      })
    });
  }

  closeButtonListener(callback) {
    document.querySelector('.close-button').addEventListener('click', () => {
      callback({
        endDateContainer: document.querySelector('.end-date__container'),
        endDateInput: document.querySelector('.end-date'),
        showEndDateContainer: document.querySelector('.show-end-date__container'),
      })
    });
  }

  goalFormListener(callback) {
    document.querySelector('.goal__form').addEventListener('submit', (event) => {
      callback({
        event,
        calories: document.querySelector('.calories-target'),
        startDate: document.querySelector('.start-date'),
        endDate: document.querySelector('.end-date'),
      })

      event.preventDefault();
    });
  }
}

export default GoalView;
