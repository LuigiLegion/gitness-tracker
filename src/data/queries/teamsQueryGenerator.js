// Query Generator
const teamsQueryGenerator = organizationLogin => {
  const teamsQuery = `
    {
      organization(login: "${organizationLogin}") {
        teams(first: 100, orderBy: {field: NAME, direction: DESC}) {
          edges {
            node {
              id
              slug
              name
              createdAt
            }
          }
        }
      }
    }
  `;

  console.log({ teamsQuery });

  return teamsQuery;
};

// Exports
module.exports = teamsQueryGenerator;
