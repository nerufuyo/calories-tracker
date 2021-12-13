import AddFood from "../views/pages/AddFood.js";
import Dashboard from "../views/pages/dashboard.js";
import EditFood from "../views/pages/EditFood.js";
import FoodDiary from "../views/pages/FoodDiary.js";
import Goal from "../views/pages/Goal.js";

const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/food-diary': FoodDiary,
  '/add-food': AddFood,
  '/edit-food': EditFood,
  '/goal': Goal,
}

export default routes;