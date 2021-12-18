import DateHelper from '../../../utils/DateHelper.js';

class GoalView {
  getTitleTemplate() {
    return `
      <i class="fas fa-bullseye"></i> Goal
    `;
  }

  getContentTemplate() {
    return `<form class="goal__form">
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
      <div class="input-group calories-target__input">
        <div class="input-name">Calories</div>
        <div class="form-input"><input type="number" placeholder="Enter your calories target" class="calories-target" min="0" required></div>
        <div>/ day</div>
      </div>
    </label>
    <div class="info"><span>*Calories recommendation according to <a href="https://www.fda.gov/media/112972/download" target="_blank">fda.gov</a></span></div>

    <div class="set-goal-button__container">
      <button class="set-goal-button"><i class="far fa-plus-square"></i> Set Goal</button>
    </div>
  </form>`;
  }
}

export default GoalView;
