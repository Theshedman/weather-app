const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/27cb61a359902ddc84020033b46f96d4/${lat},${long}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (body.error) {
      const { code, error } = body;
      callback(`${error}. exiting with a ${code} error code!`, undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { data } = body.daily;
      const { summary, temperatureHigh, temperatureLow } = data[0];
      callback(
        undefined,
        `${summary} It is currently ${temperature} degree out. The high today is ${temperatureHigh} with a low of ${temperatureLow}. There is a ${precipProbability}% chance of rain.`,
      );
    }
  });
};

module.exports = forecast;
