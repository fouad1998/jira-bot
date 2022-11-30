function countDoneTasks(source) {
  return source
    .map((story) => story.subtasks)
    .flat(2)
    .filter((subtask) => subtask.status.toLowerCase() === "done").length;
}

module.exports = { countDoneTasks };
