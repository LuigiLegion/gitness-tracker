// Query Generator
const organizationContributorsQueryGenerator = (
  organizationLogin,
  fullYear,
  fullMonth
) => {
  const organizationContributorsQuery = `
    {
      organization(login: "${organizationLogin}") {
        membersWithRole(first: 100) {
          edges {
            node {
              id,
              login,
              contributionsCollection(from: "${fullYear}-${fullMonth}-01T00:00:00Z") {
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
module.exports = organizationContributorsQueryGenerator;
