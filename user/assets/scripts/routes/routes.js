import AddFood from "../views/pages/AddFood.js";
import Dashboard from "../views/pages/dashboard.js";
import EditFood from "../views/pages/EditFood.js";
import FoodDiary from "../views/pages/FoodDiary.js";

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/food-diary': FoodDiary,
  '/add-food': AddFood,
  '/edit-food': EditFood,
}

export default routes;