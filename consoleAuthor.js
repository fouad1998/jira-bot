const { FgBlue, Reset } = require("./color");
const { formatTime } = require("./formatTime");

function consoleAuthor(task, tasks) {
  const total = tasks
    .filter((e) => e.author === task.author)
    .reduce((pre, c) => pre + c.time, 0);

  console.log("");
  console.log(FgBlue, task.author, "(" + formatTime(total) + ")", ":", Reset);
}

module.exports = { consoleAuthor };
