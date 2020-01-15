// Query Generator
const teamContributorsQueryGenerator = (
  organizationLogin,
  teamSlug,
  timeISO
) => {
  const teamContributorsQuery = `
    {
      organization(login: "${organizationLogin}") {
        team(slug: "${teamSlug}") {
          members {
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
    }
  `;

  // console.log({ teamContributorsQuery });

  return teamContributorsQuery;
};

// Exports
export default teamContributorsQueryGenerator;
