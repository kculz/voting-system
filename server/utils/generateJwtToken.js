const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = function generateToken(data, age) {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: age });

  return token;
};
