// Query Generator
const teamContributorsQueryGenerator = (
  organizationLogin,
  teamSlug,
  cursor,
  timeISO
) => {
  const teamContributorsQuery = `
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

  // console.log({ teamContributorsQuery });

  return teamContributorsQuery;
};

// Exports
export default teamContributorsQueryGenerator;
