const { nextISSTimesForMyLocation } = require('./iss');
// parse through the returned data from ISS and create a readable date and duration.

const printPassTimes = function(passTimes) {
  for (let i in passTimes) {
    const date = new Date(passTimes[i].risetime * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const day = days[date.getDay()];
    const dOfMonth = date.getDate();
    const hour  = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    console.log(`Next pass at ${day} ${month} ${dOfMonth} ${hour}:${minutes}:${seconds} GMT-0700 (Mountain Standard Time) for ${passTimes[i].duration} seconds`);
  }
};
// calls nextISSTimesForMyLocation from './iss' returns all pass times or error.
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});