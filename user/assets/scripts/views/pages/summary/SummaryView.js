class SummaryView {
  getTitleTemplate() {
    return `
      <i class="fas fa-file-alt"></i> Summary
    `;
  }

  getContentTemplate() {
    return `
      <div class="date-range__container">
        <div class="data-range-since__container">
          <div>Since</div>
          <input type="date" class="date-since-input">
        </div>
        <div class="data-range-until__container">
          <div>Until</div>
          <input type="date" class="date-until-input">
        </div>
        <div class="reset-button__container">
          <button class="reset-button">Reset</button>
        </div>
      </div>

      <div class="summary-row-title__container">
        <div class="summary-row-title__1">Total Calories</div>
        <div class="summary-row-title__2">Percentage</div>
      </div>

      <div class="summary-calories__section breakfast-summary">
        <span class="summary-column-title">Breakfast</span>
        <span class="summary-calories-number breakfast-summary-calories">0</span>
        <div class="summary-calories-percentage ">
          <span class="breakfast-summary-percentage">0</span>%
        </div>
        </div>

      <div class="summary-calories__section lunch-summary">
        <span class="summary-column-title">Lunch</span>
        <span class="summary-calories-number lunch-summary-calories">0</span>
        <div class="summary-calories-percentage ">
          <span class="lunch-summary-percentage">0</span>%
        </div>
        </div>

      <div class="summary-calories__section dinner-summary">
        <span class="summary-column-title">Dinner</span>
        <span class="summary-calories-number dinner-summary-calories">0</span>
        <div class="summary-calories-percentage ">
          <span class="dinner-summary-percentage">0</span>%
        </div>
        </div>

      <div class="summary-calories__section snack-summary">
        <span class="summary-column-title">Snack</span>
        <span class="summary-calories-number snack-summary-calories">0</span>
        <div class="summary-calories-percentage ">
          <span class="snack-summary-percentage">0</span>%
        </div>
        </div>
    `;
  }

  dateRangeListener(callback) {
    document.querySelector('.date-since-input').addEventListener('change', (event) => {
      callback({
        dateSince: event.target,
        dateUntil: document.querySelector('.date-until-input'),
      });
    });

    document.querySelector('.date-until-input').addEventListener('change', (event) => {
      callback({
        dateSince: document.querySelector('.date-since-input'),
        dateUntil: event.target,
      });
    });
  }

  resetButtonListener(callback) {
    document.querySelector('.reset-button').addEventListener('click', () => {
      callback({
        dateSince: document.querySelector('.date-since-input'),
        dateUntil: document.querySelector('.date-until-input'),
      })
    })
  }

  showSummaryData(callback) {
    callback({
      breakfastCalories: document.querySelector('.breakfast-summary-calories'),
      breakfastPercentage: document.querySelector('.breakfast-summary-percentage'),
      lunchCalories: document.querySelector('.lunch-summary-calories'),
      lunchPercentage: document.querySelector('.lunch-summary-percentage'),
      dinnerCalories: document.querySelector('.dinner-summary-calories'),
      dinnerPercentage: document.querySelector('.dinner-summary-percentage'),
      snackCalories: document.querySelector('.snack-summary-calories'),
      snackPercentage: document.querySelector('.snack-summary-percentage'),
    })
  }
}

export default SummaryView;
