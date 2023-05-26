// authUtils.js

// Sample authentication utility functions
const bcrypt = require('bcrypt');

const authUtils = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  comparePassword: async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  },

  generateAuthToken: (userId) => {
    // Generate and return a JWT token
  }
};

module.exports = authUtils;
