require("dotenv/config");
const readline = require("readline");
const { getStories: getTasks } = require("./getTasks");
const { getTasksDb } = require("./getTasksDb");
const { getAddedTasks: getAddedTasks } = require("./getAddedTasks");
const { insert } = require("./insert");
const { changedState } = require("./changedStats");
const { doneTasks } = require("./doneTasks");
const { progressTasks } = require("./progressTasks");
const { countDoneTasks } = require("./countDoneTasks");
const { countTasks } = require("./countTasks");
const { leftTasks } = require("./leftTasks");
const { consoleTask } = require("./consoleTask");
const { consoleAuthor } = require("./consoleAuthor");
const { consoleTitle } = require("./consoleTitle");
const { consoleChangedTask } = require("./consoleChangedTask");
const { clearConsole } = require("./clearConsole");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  const jiraTasks = await getTasks();

  const dbTasks = await getTasksDb();

  const addedTasks = await getAddedTasks(jiraTasks, dbTasks);

  const changedStatusTasks = changedState(jiraTasks, dbTasks);

  const done = doneTasks(jiraTasks, dbTasks);
  const progress = progressTasks(jiraTasks);
  const left = leftTasks(jiraTasks);

  const totalTasks = countTasks(jiraTasks);
  const wholeDoneTask = countDoneTasks(jiraTasks);

  clearConsole();

  consoleTitle("Stats");
  console.log("total Tasks", totalTasks, "done tasks", wholeDoneTask);

  if (done.length > 0) {
    consoleTitle("Tasks done: ");
    let author = "";
    for (const task of done) {
      if (author !== task.author) {
        consoleAuthor(task, done);
        author = task.author;
      }

      consoleTask(task);
    }
  }

  if (changedStatusTasks.length !== 0) {
    consoleTitle("Changed tasks: ");
    author = "";
    for (const task of changedStatusTasks) {
      if (author !== task.author) {
        consoleAuthor(task, changedStatusTasks);
        author = task.author;
      }

      consoleChangedTask(task);
    }
  }

  if (progress.length !== 0) {
    consoleTitle("Progress tasks: ");
    author = "";
    for (const task of progress) {
      if (author !== task.author) {
        consoleAuthor(task, progress);
        author = task.author;
      }

      consoleTask(task);
    }
  }

  if (addedTasks.length !== 0) {
    consoleTitle("Added tasks: ");
    author = "";
    for (const task of addedTasks) {
      consoleTask(task);
    }
  }

  if (left.length !== 0) {
    consoleTitle("Left tasks: ");
    for (const task of left) {
      consoleTask(task);
    }
  }

  const answer = await new Promise((resolve) => {
    rl.question("Do you want to save? (yes/no) ", function (answer) {
      resolve(answer);
      rl.close();
    });
  });
  if (/y|yes|ye/i.test(answer)) {
    await insert(jiraTasks);
  }
})();
