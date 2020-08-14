// Query Generator
const userContributionsQuery = (userLogin, timeISO) =>
  `
    {
      user(login: "${userLogin}") {
        id,
        login,
        contributionsCollection(from: "${timeISO}") {
          totalCommitContributions
        }
      }
    }
  `;

// Exports
export default userContributionsQuery;
