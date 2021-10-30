import React from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";
import chalk from "chalk";
import gradient from "gradient-string";
import Box from './Box';
import useRequestInterval from "@hook/useRequestInterval";
import findWeather from "@api/findWeather";

function formatWeather(data = []) {
  const [results] = data;
  const { location, current, forecast } = results;
  const { degreetype } = location;
  const { temperature, skytext } = current;
  const tempStr = `${temperature}°${degreetype}`;
  const { low, high } = forecast[1];
  const lowStr = `${low}°${degreetype}`;
  const highStr = `${high}°${degreetype}`;
  return `${chalk.yellow(tempStr)} and ${chalk.green(skytext)} (${chalk.blue(
    lowStr
  )} → ${chalk.red(highStr)})`;
}

const FONTS = [
  "Straight",
  "ANSI Shadow",
  "Shimrod",
  "doom",
  "Big",
  "Ogre",
  "Standard",
  "Bigfig",
  "Mini",
  "Small Shadow",
];

const Today = ({
  timeInterval = 5000,
  search = "Ho Chi Minh, VN",
  degreeType = "C",
  top,
  left,
  width,
  height,
}) => {
  const boxProps = { top, left, width, height};
  const [fontIndex, setFontIndex] = React.useState(0);
  const [now, setNow] = React.useState(new Date());
  // const options = React.useMemo(() => ({search, degreeType}), [search, degreeType]);
  const weather = useRequestInterval(findWeather, { search, degreeType }, timeInterval);

  useInterval(() => {
    setNow(new Date());
  }, 60000); // 1 minute

  const date = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = figlet.textSync(
    now.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    {
      font: FONTS[fontIndex % FONTS.length],
    }
  );
  return (
    <Box
      label="Today"
      {...boxProps}
    >
      <text right={1}>{chalk.blue(date)}</text>
      <text top="center" left="center">
        {gradient.atlas.multiline(time)}
      </text>
      <text left={1} top="100%-3">
        {weather.status === "loading"
          ? "Loading..."
          : weather.error
          ? `Error: ${weather.error}`
          : formatWeather(weather.data)}
      </text>
    </Box>
  );
};

export default Today;
