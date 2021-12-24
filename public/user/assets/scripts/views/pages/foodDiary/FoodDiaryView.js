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
        <div class="set-goal-link__container">
          <button class="set-goal-link"><a><i class="fas fa-bullseye"></i> Set Goal</a></button>
        </div>
        <div class="date-picker__container">
          <a class="date-picker-button date-picker-previous"><i class="fas fa-angle-left"></i></a>
          <div class="date-picker-input__container">
            <div class="day-of-date"></div>
            <div class="date-picker-input"><input type="date"></div>
          </div>
          <a class="date-picker-button date-picker-next"><i class="fas fa-angle-right"></i></a>
        </div>
        <div class="add-food-link__container">
          <button class="add-food-link"><a><i class="far fa-plus-square"></i> Add Food</a></button>
        </div>
      </div>

      <div class="calories-remaining__container">
        <h2>Calories Remaining</h2>
        <div class="calories-remaining-formula">
          <div class="section calories-goal-number__container">
            <div class="operation calories-goal-number"></div>
            <div class="title">Goal</div>
          </div>
          <div class="operation">-</div>
          <div class="section calories-food-total__container">
            <div class="operation calories-food-total"></div>
            <div class="title">Food</div>
          </div>
          <div class="operation">=</div>
          <div class="section calories-number-remaining__container">
            <div class="operation calories-number-remaining"></div>
            <div class="title">Remaining</div>
          </div>
        </div>
      </div>

      <div class="food-diary-list__column-title">
        <div class="title title-1">Serving Size (g)</div>
        <div class="title title-2">Calories</div>
      </div>

      <div class="breakfast-list food-diary-list">
        <div class="title">
          <h2>Breakfast</h2>
          <div class="total-calories"></div>
        </div>
        <div class="breakfast-data food-data-list">
        </div>
      </div>

      <div class="lunch-list food-diary-list">
        <div class="title">
          <h2>Lunch</h2>
          <div class="total-calories"></div>
        </div>
        <div class="lunch-data food-data-list">
        </div>
      </div>

      <div class="dinner-list food-diary-list">
        <div class="title">
          <h2>Dinner</h2>
          <div class="total-calories"></div>
        </div>
        <div class="dinner-data food-data-list">
        </div>
      </div>

      <div class="snack-list food-diary-list">
        <div class="title">
          <h2>Snack</h2>
          <div class="total-calories"></div>
        </div>
        <div class="snack-data food-data-list">
        </div>
      </div>

      <div id="id01" class="modal">
        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
        <form class="modal-content" action="/action_page.php">
          <div class="container">
            <h2>Delete Food</h2>
            <p>Are you sure want to delete <b class="foodName"></b>?</p>
          
            <div class="buttons">
              <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
              <button type="button" onclick="document.getElementById('id01').style.display='none'" class="deletebtn">Delete</button>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  showDatePicker(callback) {
    callback({datePicker: document.querySelector('.date-picker-input input[type="date"]')});
  }

  datePickerListener(callback) {
    document.querySelector('.date-picker-input input[type="date"]').addEventListener('change', (event) => {
      callback(event);
    });
  }

  showDay(callback) {
    callback(document.querySelector('.day-of-date'));
  }

  showDatePickerButton(callback) {
    callback({
      datePickerNext: document.querySelector('.date-picker-next'),
      datePickerPrevious: document.querySelector('.date-picker-previous'),
    });
  }

  showBreakfast(callback) {
    callback({
      breakfastTotal: document.querySelector('.breakfast-list .total-calories'),
      breakfastData: document.querySelector('.breakfast-data'),
    });
  }

  showLunch(callback) {
    callback({
      lunchTotal: document.querySelector('.lunch-list .total-calories'),
      lunchData: document.querySelector('.lunch-data'),
    });
  }

  showDinner(callback) {
    callback({
      dinnerTotal: document.querySelector('.dinner-list .total-calories'),
      dinnerData: document.querySelector('.dinner-data'),
    });
  }

  showSnack(callback) {
    callback({
      snackTotal: document.querySelector('.snack-list .total-calories'),
      snackData: document.querySelector('.snack-data'),
    });
  }

  foodDataTemplate(foodDiary) {
    return `
      <div class="food-data">
        <div>${foodDiary.name || '-'}</div>
        <div>${foodDiary.servingSize || '-'}</div>
        <div>${foodDiary.calories || '-'}</div>
        <div class="button-container">
          ${foodDiary ?
            `
              <button class="edit-food-link"><a href="#/edit-food/${foodDiary.id}"><i class="far fa-edit"></i> Edit</a></button>
              <button class="delete-food-button" data-id="${foodDiary.id}"><i class="fas fa-trash-alt"></i> Delete</button>
            ` :
            ''
}
        </div>
      </div>
    `;
  }

  showCaloriesRemaining(callback) {
    callback({
      goalCaloriesElement: document.querySelector('.calories-goal-number'),
      foodCaloriesElement: document.querySelector('.calories-food-total'),
      remainingCaloriesElement: document.querySelector('.calories-number-remaining'),
    });
  }

  showModal(callback) {
    callback({
      modal: document.querySelector('.modal'),
      deleteConfirm: document.querySelector('.modal .deletebtn'),
    });
  }

  deleteFoodListener(callback) {
    callback(document.querySelectorAll('.delete-food-button'));
  }

  showAddFoodLink(callback) {
    callback(document.querySelector('.add-food-link a'));
  }

  showSetGoalLink(callback) {
    callback(document.querySelector('.set-goal-link a'));
  }
}

export default FoodDiaryView;
