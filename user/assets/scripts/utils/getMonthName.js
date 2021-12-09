function getMonthName(dateInput) {
  const date = dateInput ? new Date(dateInput) : new Date();
  
  return date.toLocaleString('default', { month: 'long' });
}

export default getMonthName;