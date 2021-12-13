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
            <div class="form-input"><input type="text" placeholder="Enter food name" value="Spaghetti" class="food-name" required></div>
          </div>
        </label>
        <label>
          <div class="input-group serving-size__input">
            <div class="input-name">Serving Size</div>
            <div class="form-input"><input type="number" placeholder="Enter food serving size" value="200" min="0" class="serving-size" required></div>
            <div> / g</div>
          </div>
        </label>
        <label>
          <div class="input-group calories__input">
            <div class="input-name">Calories</div>
            <div class="form-input"><input type="number" placeholder="Enter food calories" class="food-calories" value="300" min="0" required></div>
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
        <div class="edit-food-button__container">
          <button class="edit-button edit-food-button" ><i class="far fa-edit"></i> Update Food</button>
        </div>
      </form>
    `
  }
}

export default EditFoodView;