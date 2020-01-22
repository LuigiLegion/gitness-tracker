// Query Generator
const userContributionsQueryGenerator = (userLogin, timeISO) => {
  const userContributionsQuery = `
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

  // console.log({ userContributionsQuery });

  return userContributionsQuery;
};

// Exports
export default userContributionsQueryGenerator;
