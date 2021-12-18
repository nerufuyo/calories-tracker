import DateHelper from '../../../utils/DateHelper.js';

class AddFoodView {
  getTitleTemplate() {
    return `
      <i class="fas fa-folder-plus"></i> Add Food
    `;
  }

  getContentTemplate() {
    return `
      <form class="add-food__form">
        <label>
          <div class="input-group food-name__input">
            <div class="input-name">Name</div>
            <div class="form-input"><input type="text" placeholder="Enter food name" class="food-name" required></div>
          </div>
        </label>
        <label>
          <div class="input-group serving-size__input">
            <div class="input-name">Serving Size</div>
            <div class="form-input"><input type="text" placeholder="Enter food serving size" class="serving-size" required></div>
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
                <option value="Breakfast" selected>Breakfast</option>
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
            <div class="form-input"><input type="date" class="food-calories" value="${DateHelper.getYYYYMMDD(new Date())}" required></div>
          </div>
        </label>
        <div class="add-food-button__container">
          <button class="add-food-button"><i class="far fa-plus-square"></i> Add Food</button>
        </div>
      </form>
    `;
  }
}

export default AddFoodView;
