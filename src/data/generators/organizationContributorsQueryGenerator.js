// Query Generator
const organizationContributorsQueryGenerator = (
  organizationLogin,
  cursor,
  timeISO
) => {
  const organizationContributorsQuery = `
    {
      organization(login: "${organizationLogin}") {
        membersWithRole(first: 25${cursor ? `, after: "${cursor}"` : ''}) {
          edges {
            cursor,
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

  return organizationContributorsQuery;
};

// Exports
export default organizationContributorsQueryGenerator;
