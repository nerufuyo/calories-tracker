import AddFood from "../views/pages/AddFood.js";
import Dashboard from "../views/pages/dashboard.js";
import FoodDiary from "../views/pages/FoodDiary.js";

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/food-diary': FoodDiary,
  '/add-food': AddFood,
}

export default routes;