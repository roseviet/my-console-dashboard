const weather = require("weather-js");
weather.find(
  {
    search: "Ho Chi Minh, VN",
    degreeType: "C",
  },
  (error, result) => {
    if (error) console.error(error);
    console.log(JSON.stringify(result, null, 2));
  }
);
