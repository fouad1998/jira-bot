const { postgresPool } = require('./db');

async function setup() {
  await postgresPool.query(`
   CREATE TABLE IF NOT EXISTS stories (
      key VARCHAR(40) PRIMARY KEY,
      title VARCHAR(255),
      points INT,
      status TEXT
   );
`);

  await postgresPool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
         key VARCHAR(40) PRIMARY KEY,
         title VARCHAR(255),
         status TEXT,
         author VARCHAR(255),
         time TEXT,
         parent VARCHAR(40) REFERENCES stories(key) ON DELETE CASCADE
         );

`);
}

setup();
