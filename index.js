// import register from "@babel/register";
// register({
//   presets: [["@babel/preset-env"], ["@babel/preset-react"]],
// });

// import "./dashboard";
require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
  plugins: [
    "@babel/plugin-transform-runtime"
  ]
});
const { hijackEffects } = require('stop-runaway-react-effects')
hijackEffects();
require("./dashboard");
