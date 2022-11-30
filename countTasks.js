function countTasks(source) {
  return source.reduce((pre, c) => pre + c.subtasks.length, 0);
}

module.exports = { countTasks };
