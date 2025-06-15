// index.js is the file that will require and run our main fetch function.

const { fetchMyIP } = require('./iss.js');
const { fetchCoordsByIP } = require('./iss.js');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("IP doesn't exist so we failed to get coordinates", error);
      return;
    }
    console.log("The coordinates of the IP are: ", data);

  });
  
});


