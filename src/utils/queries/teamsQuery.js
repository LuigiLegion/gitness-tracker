// Initializations
const teamsQuery = organizationLogin =>
  `
    {
      organization(login: "${organizationLogin}") {
        teams(first: 100, orderBy: {field: NAME, direction: ASC}) {
          edges {
            node {
              id,
              slug
            }
          }
        }
      }
    }
  `;

// Exports
export default teamsQuery;
