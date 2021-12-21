import GoalDb from "../data/GoalDb.js";

const GoalHelper = {
  async getGoal(date) {
    const d = new Date(date);
    const goals = await GoalDb.get();

    let myGoal = 0;
    for (let goal of goals) { 
      console.log(goals);
      if (d.getTime() >= goal.startDate.getTime()) {
        console.log(goal);
        if (goal.endDate) {
          if (d.getTime() <= goal.endDate.getTime()) {
            myGoal = goal.calories;
            break;
          }
          continue;
        }

        myGoal = goal.calories;
        break;
      }
    }

    return myGoal;
  }
}

export default GoalHelper;