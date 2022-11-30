const { FgYellow, FgGreen, Reset, FgMagenta } = require("./color");
const { formatTime } = require("./formatTime");

function consoleTask(task) {
  console.log(
    FgYellow,
    task.parent,
    FgGreen,
    task.key,
    Reset,
    task.title,
    "-",
    FgMagenta,

    formatTime(task.time)
  );
}

module.exports = { consoleTask };
