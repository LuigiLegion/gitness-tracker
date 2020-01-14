// Query Generator
const organizationsQueryGenerator = userLogin => {
  const organizationsQuery = `
    {
      user(login: "${userLogin}") {
        id
        name
        email
        organizations(first: 100) {
          nodes {
            id
            login
            email
            name
            avatarUrl
          }
        }
      }
    }
  `;

  // console.log({ organizationsQuery });

  return organizationsQuery;
};

// Exports
module.exports = organizationsQueryGenerator;
