// Query Generator
const organizationContributionsQueryGenerator = (
  organizationLogin,
  fullYear,
  fullMonth
) => {
  const organizationContributionsQuery = `
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

  console.log({ organizationContributionsQuery });

  return organizationContributionsQuery;
};

// Exports
module.exports = organizationContributionsQueryGenerator;
