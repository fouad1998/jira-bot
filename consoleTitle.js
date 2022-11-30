const { FgRed, Reset } = require("./color");

function consoleTitle(title) {
  console.log("");
  console.log();
  console.log(FgRed, title);
  console.log("=====================", Reset);
}

module.exports = { consoleTitle };
