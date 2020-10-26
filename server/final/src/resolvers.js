module.exports = {
  Query: {
    users: (_, __, { dataSources }, info) =>
      dataSources.userAPI.getUsers()
  }
};