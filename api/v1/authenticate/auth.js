const router = require("express").Router();
const models = require("../../../models");
const createError = require("http-errors");

const {
  encryptPassword,
  comparePassword,
} = require("../../../components/encryptPassword");

// Login with user email and password
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return next(createError(422, "Email is required"));
  if (!password) return next(createError(422, "Password is required"));

  return models.User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) throw createError(422, "Incorrect email or password");

      return comparePassword(password, user.password);
    })
    .then((hash) => {
      if (!hash) throw createError(422, "Incorrect email or password");
      else return true;
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "You have successfully logged in",
      });
    })
    .catch(next);
});

// Create account with Email and Password
router.post("/register", (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return next(createError(422, "Email is required"));
  if (!password) return next(createError(422, "Password is required"));

  return models.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user) throw createError(422, "User with this email already exist");

      return encryptPassword(password);
    })
    .then((passwordHash) => {
      return models.User.create({
        email: email,
        password: passwordHash,
      });
    })
    .then(() => {
      res.status(200).json({
        message: "You have registered successfully",
      });
    })
    .catch(next);
});

// Reset user password with email
router.put("/resetpassword", (req, res, next) => {
  const { email, newPassword } = req.body;

  let userData = null;

  if (!email) return next(createError(422, "Email is required"));
  if (!newPassword) return next(createError(422, "Password is required"));

  return models.User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) throw createError(422, "No user found");
      userData = user;

      return encryptPassword(newPassword);
    })
    .then((hash) => {
      userData.password = hash;
      return userData.save();
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    })
    .catch(next);
});

module.exports = router;
