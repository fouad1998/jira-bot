const { execSync } = require("child_process");

function clearConsole() {
  const readline = require("readline");
  const blank = "\n".repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

module.exports = { clearConsole };
