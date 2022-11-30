const { clearConsole } = require("./clearConsole");
const { fetcher } = require("./fetcher");

async function getStories() {
  const sprints = await fetcher(
    "https://cureety.atlassian.net/rest/agile/latest/board/17/sprint"
  );

  const currentSprint = sprints.values.find((e) => e.state === "active");

  const stories = (
    await fetcher(
      "https://cureety.atlassian.net/rest/agile/1.0/sprint/" +
        currentSprint.id +
        "/issue"
    )
  ).issues;

  const total = stories.reduce(
    (pre, story) => pre + story.fields.subtasks.length,
    0
  );

  let index = 1;
  for (const story of stories) {
    story.subtasks = [];
    story.status = story.fields.status.name;
    story.points = story.fields.customfield_10016;
    story.title = story.fields.summary;

    const subtasks = [];
    for (let i = 0; i < story.fields.subtasks.length; i++) {
      const url = story.fields.subtasks[i].self;

      clearConsole();
      console.log("loading... ", ((index * 100) / total).toFixed(2) + "%");
      const subtask = await fetcher(url);
      subtask.status = subtask.fields.status.name;
      subtask.author = subtask.fields.assignee?.displayName || "unknown";
      subtask.time = subtask.fields.timeoriginalestimate || 0;
      subtask.title = subtask.fields.summary;

      delete subtask.fields;

      subtasks[i] = subtask;
      ++index;
    }

    story.subtasks = subtasks;
    delete story["fields"];
  }

  return stories;
}

module.exports = { getStories };
