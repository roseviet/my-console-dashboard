import weather from "weather-js";
export default function findWeather({ search, degreeType }) {
  return new Promise((resolve, reject) => {
    weather.find(
      {
        search,
        degreeType,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
}