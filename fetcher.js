const { JIRA_EMAIL, JIRA_TOKEN } = require("./const");

function fetcher(source, options) {
  return fetch(source, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(JIRA_EMAIL + ":" + JIRA_TOKEN).toString("base64"),
    },
    ...options,
  }).then((e) => e.json());
}

module.exports = { fetcher };
