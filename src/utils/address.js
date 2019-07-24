const address = (callback) => {
  const location = process.argv[2];
  if (!location)
    callback('Error: no location provided. Try again with a location!', undefined);
  else callback(undefined, location);
};

module.exports = address;
