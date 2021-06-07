// Initializations
const organizationsQuery = userLogin =>
  `
    {
      user(login: "${userLogin}") {
        id,
        organizations(first: 100) {
          nodes {
            id,
            login
          }
        }
      }
    }
  `;

// Exports
export default organizationsQuery;
