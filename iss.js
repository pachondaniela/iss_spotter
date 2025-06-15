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
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };