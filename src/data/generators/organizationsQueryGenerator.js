// Query Generator
const organizationsQueryGenerator = userLogin => {
  const organizationsQuery = `
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

  // console.log({ organizationsQuery });

  return organizationsQuery;
};

// Exports
export default organizationsQueryGenerator;
