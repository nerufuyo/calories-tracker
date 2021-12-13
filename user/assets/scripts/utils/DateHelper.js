const DateHelper = {
  getYYYYMMDD(date) {
    const d = date || new Date();

    return d.toISOString().split('T')[0];
  },

  getYear(date) {
    const d = date ? new Date(date) : new Date();
    
    return d.getFullYear();
  },

  getMonthName(date) {
    const d = date ? new Date(date) : new Date();
    
    return d.toLocaleString('default', { month: 'long' });
  },

  getPreviousMonth(date) {
    const d = date ? new Date(date) : new Date();
    d.setMonth(d.getMonth() - 1)

    return d.toISOString().split('T')[0];
  },
  
  getNextMonth(date) {
    const d = date ? new Date(date) : new Date();
    d.setMonth(d.getMonth() + 1)
  
    return d.toISOString().split('T')[0];
  },

  previousMonthRemainingDays(date) {
    const d = date ? new Date(date) : new Date();
  
    d.setDate(1);
  
    const day = d.getDay();
    
    return day;
  },
  
  nextMonthRemainingDays(date) {
    const d = date ? new Date(date) : new Date();
  
    d.setDate(d.getMonthDays())

    const day = d.getDay();
  
    return 6 - day;
  },

  setMonthDaysPrototype() {
    Date.prototype.getMonthDays = function() {
      var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
      return d.getDate();
    }
  },
}

export default DateHelper;