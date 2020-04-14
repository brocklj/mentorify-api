const { DataSource } = require('apollo-datasource');
const { User } = require('../models');

class UserAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }

  async find(id = '') {
    if (id) {
    } else {
      const { email } = this.context.user;
      return await User.findOne({ email });
    }
  }
}

module.exports = UserAPI;
