// Imports
import axios from 'axios';

import githubAccessToken from '../../config/ghConfig';

// Initializations
const githubApiEndpoint = 'https://api.github.com/graphql';
const headers = { Authorization: `bearer ${githubAccessToken}` };

const githubData = async query => {
  try {
    const { data } = await axios.post(
      githubApiEndpoint,
      { query },
      { headers }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Exports
export default githubData;
