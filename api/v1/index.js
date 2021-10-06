const router = require("express").Router();

const authRoutes = require("./authenticate/auth");

router.use("/auth", authRoutes);

module.exports = router;
