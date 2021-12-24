import DateHelper from '../../../utils/DateHelper.js';

class AddFoodPresenter {
  constructor({view, defaultDate, FoodDiaryDb, FoodAPI}) {
    this._view = view;
    this._defaultDate = defaultDate || DateHelper.getYYYYMMDD(new Date());
    this._foodDiaryDb = FoodDiaryDb;
    this._foodAPI = FoodAPI;

    this._inputDateDefaultValue();
    this._listenToAddForm();
    this._listenToFoodName();
    this._listenToServingSize();
    this._listenToWindow();
  }

  _inputDateDefaultValue() {
    this._view.generateInputDateValue((inputDateElement) => {
      inputDateElement.value = this._defaultDate;
    });
  }

  _listenToAddForm() {
    this._view.addFormListener(async ({
      name,
      servingSize,
      calories,
      category,
      date,
    }) => {
      await this._foodDiaryDb.add({
        name: name.value,
        servingSize: servingSize.value,
        calories: calories.value,
        category: category.options[category.selectedIndex].value,
        date: date.value,
      })
          .then(() => {
            name.value = '';
            servingSize.value = '';
            calories.value = '';
            this._displayAlertSuccess();
          });
    });
  }

  _listenToFoodName() {
    this._view.foodNameListener(async ({foodNameElement, autocompleteList}) => {
      autocompleteList.classList.add('active');
      autocompleteList.innerHTML = this._view.autocompleteListLoading();

      const foodName = foodNameElement.value.trim();

      if(!foodName){
        return;
      }

      const foods = await this._foodAPI.search(foodName);

      if (!foods.length) {
        autocompleteList.innerHTML = this._view.autocompleteListNotFound();
        return;
      }

      let autocompleteItem = '';
      foods.forEach((food) => {
        autocompleteItem += this._view.autocompleteItemTemplate({id: food.fdcId, name: food.description})
      });

      autocompleteList.innerHTML = autocompleteItem;

      if (!autocompleteItem) {
        return;
      }

      this._listenToAutoCompleteItem();
    })
  }

  _listenToAutoCompleteItem() {
    this._view.autocompleteItemListener(async ({autocompleteItem, foodNameElement, autocompleteList, servingSizeElement, caloriesElement}) => {
      foodNameElement.value = autocompleteItem.dataset.value;
      foodNameElement.dataset.id = autocompleteItem.dataset.id;
      caloriesElement.disabled = true;
      servingSizeElement.disabled = true;
      
      const food = await this._foodAPI.get(autocompleteItem.dataset.id);
      
      autocompleteList.innerHTML = '';
      autocompleteList.classList.remove('active');
      caloriesElement.disabled = false;
      servingSizeElement.disabled = false;

      const servingSize = food.servingSize || 0;
      const foodCalories = (food.labelNutrients ? food.labelNutrients.calories.value : 0);

      foodNameElement.dataset.servingSize = servingSize;
      foodNameElement.dataset.calories = foodCalories;

      servingSizeElement.value = servingSizeElement.value ? servingSizeElement.value : 0;

      const servingSizeElementValue = parseInt(servingSizeElement.value);

      caloriesElement.value = Math.round((servingSize ? servingSizeElementValue / servingSize : 0) * foodCalories);
    })
  }

  _listenToServingSize() {
    this._view.servingSizeListener(({foodNameElement, servingSizeElement, caloriesElement}) => {
      caloriesElement.disabled = true;

      const servingSize = parseInt(foodNameElement.dataset.servingSize) || 0;
      const foodCalories = parseInt(foodNameElement.dataset.calories) || 0;
      const servingSizeTotal = (servingSize ? parseInt(servingSizeElement.value) / servingSize : 0);

      caloriesElement.value = Math.round(servingSizeTotal * foodCalories);

      caloriesElement.disabled = false;
    });
  }

  _listenToWindow() {
    this._view.windowListener(({event, foodName, autocompleteList}) => {
      if (!event.target.matches(`.${foodName.classList[0]}`)) {
        autocompleteList.innerHTML = '';
        autocompleteList.classList.remove('active');
      }
    })
  }

  _displayAlertSuccess() {
    this._view.showAlert((alert) => {
      alert.classList.add('active', 'alert-success');
      alert.innerHTML = 'Data has been added';
    })

    setTimeout(this._hiddenAlert.bind(this), 3000);
  }

  _hiddenAlert() {
    this._view.showAlert((alert) => {
      alert.classList.remove('active', 'alert-success', 'alert-error');
      alert.innerHTML = '';
    })
  }
}

export default AddFoodPresenter;
