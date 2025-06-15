const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body; // retrieve the body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;
      const latitude = body.latitude;
      const longitude = body.longitude;

      return {latitude, longitude};

    });
   
 
};

const fetchISSFlyOverTimes = function(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
    .then((response) => {
      const body = response.body;
      const passes = body.response;
      return passes;
    });
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};

module.exports = {nextISSTimesForMyLocation};