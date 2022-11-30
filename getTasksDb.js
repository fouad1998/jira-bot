const { default: SQL } = require("sql-template-strings");
const { postgresPool } = require("./db");

async function getTasksDb() {
  const { rows: stories } = await postgresPool.query(`
      SELECT * FROM stories;
   `);

  for (const story of stories) {
    const { rows } = await postgresPool.query(SQL`
         SELECT * FROM tasks WHERE parent = ${story.key}
   `);

    story.subtasks = rows || [];
  }

  return stories;
}

module.exports = { getTasksDb };
