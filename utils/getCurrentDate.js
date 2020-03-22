exports.localDate = (v) => {
  const date = new Date(v || Date.now());
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  
  let newDate = date.toISOString();
  newDate = newDate.replace('T', ' ').slice(0, newDate.length - 5);
  
  return newDate;
}