// Query Generator
const teamContributionsQueryGenerator = (
  organizationLogin,
  teamSlug,
  fullYear,
  fullMonth
) => {
  const teamContributionsQuery = `
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

  console.log({ teamContributionsQuery });

  return teamContributionsQuery;
};

// Exports
module.exports = teamContributionsQueryGenerator;
