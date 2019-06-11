const request = require("request");

// From https://darksky.net => Pass latitude and longitude and get weather

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/0492589945b0e9a9d8e2b8bd491cae55/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to networ. Check your internet connection",
        undefined
      );
    } else if (response.body.error) {
      callback("The given latitude and longitude is invalid.", undefined);
    } else {

     
      callback(
        undefined,
        `${response.body.daily.data[0].summary}\nIt is ${
          response.body.currently.temperature
        }&#8451 out now. There is ${
          response.body.currently.precipProbability
        }% chance of rain.\n
            The highest temperature for today is ${
              response.body.daily.data[0].temperatureHigh
            }&#8451 whereas lowest one is ${
          response.body.daily.data[0].temperatureLow
        }&#8451`
      );
    }
  });
};

module.exports = forecast;
