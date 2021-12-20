import GoalDb from "../data/GoalDb.js";

const GoalHelper = {
  async getGoal(date) {
    const d = new Date(date);
    const goals = await GoalDb.get();

    let myGoal = 0;
    for (let goal of goals) {
      if (d.getTime() >= goal.startDate.getTime()) {
        if (goal.endDate && (d.getTime() <= goal.endDate.getTime())) {
          myGoal = goal.calories;
          break;
        }

        myGoal = goal.calories;
        break;
      }
    }

    return myGoal;
  }
}

export default GoalHelper;