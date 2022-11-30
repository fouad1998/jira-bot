function progressTasks(source) {
  const finished = source
    .filter((e) =>
      e.subtasks.some((e) => e.status.toLowerCase() === "in progress")
    )
    .map((story) =>
      story.subtasks
        .filter((e) => e.status.toLowerCase() === "in progress")
        .map((e) => ({ ...e, parent: story.key }))
    )
    .flat(2);

  return finished.sort((a, b) =>
    a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1
  );
}

module.exports = { progressTasks };
