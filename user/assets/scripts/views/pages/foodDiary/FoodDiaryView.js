import DateHelper from '../../../utils/DateHelper.js';

class FoodDiaryView {
  getTitleTemplate() {
    return `
      <i class="fas fa-utensils"></i> Food Diary
    `;
  }

  getContentTemplate() {
    return `
      <div class="food-diary__top">
        <div class="date-picker__container">
          <div class="date-picker-button date-picker-previous"><i class="fas fa-angle-left"></i></div>
          <div class="date-picker-input__container">
            <div class="day-of-date">Today</div>
            <div class="date-picker-input"><input type="date" value="${DateHelper.getYYYYMMDD(new Date())}"></div>
          </div>
          <div class="date-picker-button date-picker-next"><i class="fas fa-angle-right"></i></div>
        </div>
        <div class="add-food-link__container">
          <button class="add-food-link"><a href="#/add-food"><i class="far fa-plus-square"></i> Add Food</a></button>
        </div>
      </div>

      <div class="calories-remaining__container">
        <h2>Calories Remaining</h2>
        <div class="calories-remaining-formula">
          <div class="section calories-goal-number__container">
            <div class="operation calories-goal-number">2500</div>
            <div class="title">Goal</div>
          </div>
          <div class="operation">-</div>
          <div class="section calories-food-total__container">
            <div class="operation calories-food-total">500</div>
            <div class="title">Food</div>
          </div>
          <div class="operation">=</div>
          <div class="section calories-number-remaining__container">
            <div class="operation calories-number-remaining">2000</div>
            <div class="title">Remaining</div>
          </div>
        </div>
      </div>

      <div class="food-diary-list__column-title">
        <div class="title title-1">Serving Size (g)</div>
        <div class="title title-2">Calories</div>
      </div>

      <div class="food-diary-list">
        <div class="title">
          <h2>Breakfast</h2>
          <div class="total-calories">800</div>
        </div>
        <div class="food-data-list">
          <div class="food-data">
            <div>Spaghetti</div>
            <div>200g</div>
            <div>300</div>
            <div class="button-container">
              <button class="edit-food-link"><a href="#/edit-food"><i class="far fa-edit"></i> Edit</a></button>
              <button class="delete-food-button"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
          </div>
          <div class="food-data">
            <div>Fried Rice</div>
            <div>300g</div>
            <div>500</div>
            <div class="button-container">
              <button class="edit-food-link"><a href="#/edit-food"><i class="far fa-edit"></i> Edit</a></button>
              <button class="delete-food-button"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="food-diary-list">
        <div class="title">
          <h2>Lunch</h2>
          <div class="total-calories">-</div>
        </div>
        <div class="food-data-list">
          <div class="food-data">
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div class="button-container"></div>
          </div>
        </div>
      </div>

      <div class="food-diary-list">
        <div class="title">
          <h2>Dinner</h2>
          <div class="total-calories">-</div>
        </div>
        <div class="food-data-list">
          <div class="food-data">
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div class="button-container"></div>
          </div>
        </div>
      </div>

      <div class="food-diary-list">
        <div class="title">
          <h2>Snack</h2>
          <div class="total-calories">-</div>
        </div>
        <div class="food-data-list">
          <div class="food-data">
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div class="button-container"></div>
          </div>
        </div>
      </div>
    `;
  }
}

export default FoodDiaryView;
