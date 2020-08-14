// Query Generator
const organizationContributorsQuery = (organizationLogin, cursor, timeISO) =>
  `
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

// Exports
export default organizationContributorsQuery;
