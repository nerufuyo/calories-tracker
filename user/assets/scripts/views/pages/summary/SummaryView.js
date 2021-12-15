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
        <span class="summary-calories-number breakfast-summary-calories">2500</span>
        <span class="summary-calories-percentage breakfast-summary-percentage">31.25%</span>
      </div>

      <div class="summary-calories__section lunch-summary">
        <span class="summary-column-title">Lunch</span>
        <span class="summary-calories-number lunch-summary-calories">3000</span>
        <span class="summary-calories-percentage lunch-summary-percentage">37.25%</span>
      </div>

      <div class="summary-calories__section dinner-summary">
        <span class="summary-column-title">Dinner</span>
        <span class="summary-calories-number dinner-summary-calories">1500</span>
        <span class="summary-calories-percentage dinner-summary-percentage">18.75%</span>
      </div>

      <div class="summary-calories__section snack-summary">
        <span class="summary-column-title">Snack</span>
        <span class="summary-calories-number snack-summary-calories">1000</span>
        <span class="summary-calories-percentage snack-summary-percentage">12.5%</span>
      </div>
    `;
  }
}

export default SummaryView;