const DateHelper = {
  getYYYYMMDD(date) {
    const yourDate = date || new Date();

    const offset = yourDate.getTimezoneOffset();
    
    const d = new Date(yourDate.getTime() - (offset*60*1000));

    return d.toISOString().split('T')[0];
  },

  getYear(date) {
    const d = date ? new Date(date) : new Date();

    return d.getFullYear();
  },

  getMonthName(date) {
    const d = date ? new Date(date) : new Date();

    return d.toLocaleString('default', {month: 'long'});
  },

  getDayName(date) {
    const d = date ? new Date(date) : new Date();
    
    return d.toLocaleString('default', {weekday: 'long'});;
  },

  getPreviousMonth(date) {
    const yourDate = date ? new Date(date) : new Date();
    yourDate.setMonth(yourDate.getMonth() - 1);

    const offset = yourDate.getTimezoneOffset();
    
    const d = new Date(yourDate.getTime() - (offset*60*1000));

    return d.toISOString().split('T')[0];
  },

  getNextMonth(date) {
    const yourDate = date ? new Date(date) : new Date();
    yourDate.setMonth(yourDate.getMonth() + 1);

    const offset = yourDate.getTimezoneOffset();
    
    const d = new Date(yourDate.getTime() - (offset*60*1000));

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

    d.setDate(d.getMonthDays());

    const day = d.getDay();

    return 6 - day;
  },

  getNextDate(date) {
    const yourDate = date ? new Date(date) : new Date();
    yourDate.setDate(yourDate.getDate() + 1);

    const offset = yourDate.getTimezoneOffset();
    
    const d = new Date(yourDate.getTime() - (offset*60*1000));

    return d.toISOString().split('T')[0];
  },

  getPreviousDate(date) {
    const yourDate = date ? new Date(date) : new Date();
    yourDate.setDate(yourDate.getDate() - 1);

    const offset = yourDate.getTimezoneOffset();
    
    const d = new Date(yourDate.getTime() - (offset*60*1000));

    return d.toISOString().split('T')[0];
  },

  setMonthDaysPrototype() {
    Date.prototype.getMonthDays = function() {
      const d = new Date(this.getFullYear(), this.getMonth()+1, 0);
      return d.getDate();
    };
  },
};

export default DateHelper;
