function getMonthName(date) {
  if (date !== null) {
    const date = new Date(date);
  }
  else {
    const date = new Date();
  }
  
  const month = date.toLocaleString('default', { month: 'long' });
  return month;
}

export default getMonthName;