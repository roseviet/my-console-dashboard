
require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
  plugins: [
    "@babel/plugin-transform-runtime"
  ]
});
require('module-alias/register');
const { hijackEffects } = require('stop-runaway-react-effects')
hijackEffects();
require("./dashboard");
