function changedState(source, reference) {
  return source
    .filter(function (story) {
      const storyReference = reference.find((e) => e.key === story.key);
      if (!storyReference) {
        return false;
      }

      return story.subtasks.some(function (task) {
        const taskReference = storyReference.subtasks.find(
          (e) => e.key === task.key
        );
        if (!taskReference) {
          return false;
        }

        return taskReference.status !== task.status;
      });
    })
    .map((story) => {
      const storyReference = reference.find((e) => e.key === story.key);

      const subtasks = story.subtasks
        .map(function (task) {
          const taskReference = storyReference.subtasks.find(
            (e) => e.key === task.key
          );
          if (!taskReference || taskReference.status === task.status) {
            return null;
          }

          return { ...task, previousStatus: taskReference.status || "TODO" };
        })
        .filter((e) => e);

      return { ...story, subtasks };
    })
    .map((story) => story.subtasks.map((e) => ({ ...e, parent: story.key })))
    .flat(2)
    .sort((a, b) => (a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1));
}

module.exports = { changedState };
