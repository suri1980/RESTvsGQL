module.exports = {
    Query: {
      users: (_, __, { dataSources }) =>
        dataSources.userAPI.getUsers(),
    }
  };