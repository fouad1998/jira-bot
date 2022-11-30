function getAddedTasks(source, reference) {
  return source
    .filter((story) => {
      const storyReference = reference.find(
        (storyR) => storyR.key === story.key
      );
      if (!storyReference) {
        return true;
      }

      return story.subtasks?.some(
        (task) => !storyReference.subtasks.find((rt) => rt.key === task.key)
      );
    })
    .map((story) => {
      const storyReference = reference.find(
        (storyR) => storyR.key === story.key
      );
      if (!storyReference) {
        return story;
      }

      const subtasks = story.subtasks.filter((task) => {
        return !storyReference.subtasks.find((taskR) => taskR.key === task.key);
      });

      return { ...story, subtasks };
    })
    .map((story) => story.subtasks.map((e) => ({ ...e, parent: story.key })))
    .flat(2)
    .sort((a, b) => (a.parent.toLowerCase() > b.parent.toLowerCase() ? 1 : -1));
}

module.exports = { getAddedTasks };
