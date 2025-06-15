// iss file, will contain most of the logic for fetching the data from each API end point

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 * - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 * -An error, if any (nullable)
 * - The IP address as a string (null if error)
 */

const needle = require('needle');


const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    } 

   
    const latitude = body.latitude;
    const longitude = body.longitude;

    callback(null, {latitude, longitude});
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};