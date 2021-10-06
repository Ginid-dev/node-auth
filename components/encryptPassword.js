const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

exports.encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

exports.comparePassword = (password, passwordHah) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHah, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
