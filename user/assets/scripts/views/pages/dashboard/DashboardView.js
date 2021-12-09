class DashboardView {
  getTitleTemplate() {
    return `
      <i class="fas fa-chart-pie"></i> Dashboard
    `;
  }

  getContentTemplate() {
    return `
      <div class="dashboard-top">
        <div class="month-picker">
          <div class="previous-month"><i class="fas fa-angle-left"></i></div>
          <div class="next-month"><i class="fas fa-angle-right"></i></div>
          <div class="selected-month"></div>
        </div>
        <div class="bmi">
          Your BMI: <span class="bmi-data"></span>
        </div>
        <div class="calories-goal">
          Goal: <span class="calories-goal-data"></span>
        <div>
      </div>
      <div class="calendar">
        <div class="calendar-days">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednestday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div class="calendar-date">
        <div></div>
      </div>
    `;
  };
}

export default DashboardView;