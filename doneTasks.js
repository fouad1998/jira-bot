function doneTasks(source, reference) {
  const subtasksReference = reference.map((story) => story.subtasks).flat(2);

  return source
    .filter((story) =>
      story.subtasks.some((e) => e.status.toLowerCase() === "done")
    )
    .map((story) => {
      return story.subtasks
        .filter((e) => e.status.toLowerCase() === "done")
        .filter((sub) => {
          const subtask = subtasksReference.find((e) => e.key === sub.key);
          if (!subtask || subtask.status !== sub.status) {
            return true;
          }

          return false;
        })
        .map((e) => ({ ...e, parent: story.key }));
    })
    .flat(2)
    .sort((a, b) => (a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1));
}

module.exports = { doneTasks };
