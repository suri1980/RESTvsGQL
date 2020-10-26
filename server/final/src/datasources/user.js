const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require("node-fetch");


class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8080/wp/wp-json/wp/v2/';
  }

  async getUsers() {
      const response = await this.get('users');
      return Array.isArray(response) ? response.map(user => this.userReducer(user)) : [];
  }

  userReducer(user){
      return {
        id: user.id || 0,
        name: user.name || "Default User",
        avatar: this.getAvatar(user.simple_local_avatar),
        posts: async (_, {id}) => {
          const response = await fetch(`http://localhost:8080/wp/wp-json/wp/v2/posts?author=${user.id}`).then(function (response) {
                              return response.json();
                            }).then(function (data) {
                              return data;
                            }).catch(function (err) {
                                return 0;
                            });
                          return response.length || 0;
        }
      }
  }

  getAvatar(avatars){    
    return avatars[Object.keys(avatars)[Object.keys(avatars).length-1]];
  }

}

module.exports = UserAPI;