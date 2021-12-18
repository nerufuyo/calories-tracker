import DateHelper from '../../../utils/DateHelper.js';

class EditFoodView {
  getTitleTemplate() {
    return `
      <i class="fas fa-edit"></i> Edit Food
    `;
  }

  getContentTemplate() {
    return `
      <form class="edit-food__form">
        <label>
          <div class="input-group food-name__input">
            <div class="input-name">Name</div>
            <div class="form-input"><input type="text" placeholder="Enter food name" class="food-name" required></div>
          </div>
        </label>
        <label>
          <div class="input-group serving-size__input">
            <div class="input-name">Serving Size</div>
            <div class="form-input"><input type="number" placeholder="Enter food serving size" min="0" class="serving-size" required></div>
            <div> / g</div>
          </div>
        </label>
        <label>
          <div class="input-group calories__input">
            <div class="input-name">Calories</div>
            <div class="form-input"><input type="number" placeholder="Enter food calories" class="food-calories" min="0" required></div>
          </div>
        </label>
        <label>
          <div class="input-group category__input">
            <div class="input-name">Category</div>
            <div class="form-input">
              <select class="food-category">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>
        </label>
        <label>
          <div class="input-group date__input">
            <div class="input-name">Date</div>
            <div class="form-input"><input type="date" class="food-date" required></div>
          </div>
        </label>
        <div class="edit-food-button__container">
          <button type="submit" class="edit-food-button"><i class="far fa-edit"></i> Update Food</button>
        </div>
      </form>
    `;
  }

  editFormListener(callback) {
    document.querySelector('.edit-food__form')
        .addEventListener('submit', (event) => {
          console.log('masuk');
          callback({
            name: document.querySelector('.food-name'),
            servingSize: document.querySelector('.serving-size'),
            calories: document.querySelector('.food-calories'),
            category: document.querySelector('.food-category'),
            date: document.querySelector('.food-date'),
          });
          event.preventDefault();
        });
  }

  showFoodData({name, servingSize, calories, category, date}) {
    console.log('date adalah ', date);
    document.querySelector('.food-name').value = name;
    document.querySelector('.serving-size').value = servingSize;
    document.querySelector('.food-calories').value = calories;
    document.querySelector('.food-category').value = category;
    document.querySelector('.food-date').value = date;
  }
}

export default EditFoodView;
