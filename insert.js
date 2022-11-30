const { default: SQL } = require("sql-template-strings");
const { postgresPool } = require("./db");

async function insert(tasks) {
  await postgresPool.query(SQL`
     BEGIN
   `);

  for (const task of tasks) {
    await postgresPool.query(SQL`
         INSERT INTO
         stories (key, title, points, status)
         VALUES (${task.key}, ${task.title}, ${task.points}, ${task.status})
         ON CONFLICT (key) DO UPDATE SET status = ${task.status}, title = ${task.title}, points = ${task.points}
      `);

    for (const subtask of task.subtasks) {
      await postgresPool.query(SQL`
        INSERT INTO
        tasks (key, title, time, status, author, parent)
        values (${subtask.key}, ${subtask.title}, ${subtask.time}, ${subtask.status}, ${subtask.author}, ${task.key})
        ON CONFLICT (key) DO UPDATE SET status = ${subtask.status}, title = ${subtask.title}, time = ${subtask.time},
        author = ${subtask.author}
      `);
    }
  }

  await postgresPool.query(SQL`
     COMMIT
   `);
}

module.exports = { insert };
