const request = require("request");

// fetch the users ip address or an error if there is a problem.
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, function(error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    const ip = String(data.ip);
    callback(null, ip);

  });
};

// fetch the users lat and long based on IP. Returns Object {latitude: '###' and longitude: '###'}
// or error.
const fetchCoordsByIp = function(ip, callback) {
  const url = `http://ipwho.is/${ip}?output=json`;

  request(url, function(error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);

    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const coordinates = {};
    coordinates.latitude = String(data.latitude);
    coordinates.longitude = String(data.longitude);
    callback(null, coordinates);

  });
};

// fetch local flyover times. Takes coordinates as Object {latitude: '###' longitude:'###'}
// returns the next time iss passes and it's duration or errors.
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    
    callback(null, data.response);

  });
};

// waterfall functions returns callback with the next passes or errors.

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }
    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation};