// Imports
import axios from 'axios';

import githubAccessToken from '../../config/ghConfig';

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

    const { data } = fetchedGithubData;

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Exports
export default githubDataFetcher;
