// Query Generator
const organizationContributorsQueryGenerator = (organizationLogin, timeISO) => {
  const organizationContributorsQuery = `
    {
      organization(login: "${organizationLogin}") {
        membersWithRole(first: 100) {
          edges {
            node {
              id,
              login,
              contributionsCollection(from: "${timeISO}") {
                totalCommitContributions
              }
            }
          }
        }
      }
    }
  `;

  // console.log({ organizationContributorsQuery });

  return organizationContributorsQuery;
};

// Exports
export default organizationContributorsQueryGenerator;
