//const {fetchMyIP} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   //console.log(typeof ip);
//   console.log("It worked! Returned IP:", ip);
// });

// const {fetchCoordsByIp} = require('./iss');

// fetchCoordsByIp('24.66.126.81', (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("It worked! Returned Coordinates", data);
// });

// const {fetchISSFlyOverTimes} = require('./iss');

// fetchISSFlyOverTimes({ latitude: '51.0486151', longtitude: '-114.0708459'}, (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("It worked fly over is:", data);
// });

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

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});