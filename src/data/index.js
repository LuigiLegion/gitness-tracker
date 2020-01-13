// Imports
const organizationsQueryGenerator = require('./queries/organizationsQueryGenerator');
const teamsQueryGenerator = require('./queries/teamsQueryGenerator');
const organizationContributorsQueryGenerator = require('./queries/organizationContributorsQueryGenerator');
const teamContributorsQueryGenerator = require('./queries/teamContributorsQueryGenerator');
const githubDataFetcher = require('./fetchers/githubDataFetcher');

// Exports
module.exports = {
  organizationsQueryGenerator,
  teamsQueryGenerator,
  organizationContributorsQueryGenerator,
  teamContributorsQueryGenerator,
  githubDataFetcher,
};
