// Imports
const organizationsQueryGenerator = require('./queries/organizationsQueryGenerator');
const teamsQueryGenerator = require('./queries/teamsQueryGenerator');
const organizationContributionsQueryGenerator = require('./queries/organizationContributionsQueryGenerator');
const teamContributionsQueryGenerator = require('./queries/teamContributionsQueryGenerator');
const githubDataFetcher = require('./fetchers/githubDataFetcher');

// Exports
module.exports = {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributionsQueryGenerator,
  teamContributionsQueryGenerator,
  githubDataFetcher,
};
