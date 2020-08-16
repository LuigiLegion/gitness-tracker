// Initializations
const teamContributorsQuery = (organizationLogin, teamSlug, cursor, timeISO) =>
  `
    {
      organization(login: "${organizationLogin}") {
        team(slug: "${teamSlug}") {
          members(first: 25${cursor ? `, after: "${cursor}"` : ''}) {
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
    }
  `;

// Exports
export default teamContributorsQuery;
