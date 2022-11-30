const {
  FgYellow,
  FgGreen,
  Reset,
  FgMagenta,
  BgYellow,
  BgGreen,
} = require("./color");
const { formatTime } = require("./formatTime");

function consoleChangedTask(task) {
  console.log(
    FgYellow,
    task.parent,
    FgGreen,
    task.key,
    Reset,
    task.title,
    "-",
    BgYellow,
    task.previousStatus,
    Reset,
    " to ",
    BgGreen,
    task.status,
    Reset,
    "-",
    FgMagenta,
    formatTime(task.time)
  );
}

module.exports = { consoleChangedTask };
