// Imports
import axios from 'axios';

// Initializations
const githubApiEndpoint = 'https://api.github.com/graphql';
const headers = {
  Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
};

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
