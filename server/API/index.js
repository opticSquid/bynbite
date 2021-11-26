const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "API working correctly!" });
});
router.use("/auth", require("./auth"));
// Use this route to regenerate the access token. Given the refresh token is provided in authorization header.
router.use("/token", require("./regenerate"));
module.exports = router;
