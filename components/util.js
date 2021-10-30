import weather from "weather-js";
export default function ({ search, degreeType }) {
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
