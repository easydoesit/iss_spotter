/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, function(error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
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
    callback(null, data.ip);
    //console.log('JSON:', data.ip);


  });
};

//const ip = '24.66.126.81'

const fetchCoordsByIp = function(ip, callback) {
  const url = `http://ipwho.is/${ip}?output=json`;

  request(url, function(error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }
    // if (response.statusCode !== 200) {
    //   const msg = `"success:"false`;
    //   callback(Error(msg), null);
    //   return;
    // }

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

module.exports = { fetchMyIP, fetchCoordsByIp };