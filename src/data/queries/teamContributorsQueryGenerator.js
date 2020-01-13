// Query Generator
const teamContributorsQueryGenerator = (
  organizationLogin,
  teamSlug,
  fullYear,
  fullMonth
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
                contributionsCollection(from: "${fullYear}-${fullMonth}-01T00:00:00Z") {
                  totalCommitContributions
                }
              }
            }
          }
        }
      }
    }
  `;

  console.log({ teamContributorsQuery });

  return teamContributorsQuery;
};

// Exports
module.exports = teamContributorsQueryGenerator;
