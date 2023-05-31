const router = require("express").Router();
const passport = require("passport");
const { User } = require("../sequelize/sequelize");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", async (req, res) => {
  try {
    // console.log(req.user.emails);

    if (req.user) {
      const user = await User.findOne({
        where: { email: req.user._json.email },
      });
      if (user) {
        res.status(200).json({
          success: true,
          message: "successfull",
          user: req.user,
          //   cookies: req.cookies
        });
      } else {
        const body = {
          first_name: req.user.name.givenName,
          last_name: req.user.name.familyName,
          email: req.user._json.email,
          password: req.user.id,
          external_type: req.user.provider,
          external_id: req.user.id,
        };

        await User.create(body);
        res.status(200).json({
          success: true,
          message: "successfull",
          user: req.user,
          //   cookies: req.cookies
        });
      }
    }
  } catch (error) {
    handleHttpError(res, error.message, 500);
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
