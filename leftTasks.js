function leftTasks(source) {
  return source
    .filter((story) => {
      return story.subtasks.some(
        (sub) => !["done", "in progress"].includes(sub.status.toLowerCase())
      );
    })
    .map((story) => {
      return {
        ...story,
        subtasks: story.subtasks.filter(
          (sub) => !["done", "in progress"].includes(sub.status.toLowerCase())
        ),
      };
    })
    .map((story) => story.subtasks.map((e) => ({ ...e, parent: story.key })))
    .flat(2)
    .sort((a, b) => (a.parent.toLowerCase() > b.parent.toLowerCase() ? 1 : -1));
}

module.exports = { leftTasks };
