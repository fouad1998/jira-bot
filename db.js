const { Pool } = require("pg");

const postgresPool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: 5432,
  min: 0,
  max: 0xffff,
  password: process.env.PGPASSWD,
  user: process.env.PGUSER,
  database: process.env.PGDB,
});

module.exports = { postgresPool };
