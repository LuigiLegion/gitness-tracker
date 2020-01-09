// Imports
const axios = require('axios');

const githubAccessToken = require('../../config/ghConfig');

// Initializations
const githubApiEndpoint = 'https://api.github.com/graphql';
const headers = { Authorization: `bearer ${githubAccessToken}` };

// Data Fetcher
const githubDataFetcher = async query => {
  try {
    const fetchedGithubData = await axios.post(
      githubApiEndpoint,
      { query },
      { headers }
    );

    const {
      data: { data },
    } = fetchedGithubData;

    console.log({ data });

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Exports
module.exports = githubDataFetcher;
