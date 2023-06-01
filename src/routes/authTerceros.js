const router = require("express").Router();
const passport = require("passport");
const { User } = require("../sequelize/sequelize");
const transporter = require("../config/mailer");

const CLIENT_URL = "https://medconnectfront-production.up.railway.app";

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

    //Enviar correo electrónico de confirmación o bienvenida al usuario

    await transporter.sendMail({
      from: '"Medconnect" <services.medconnect@gmail.com>', // sender address
      to: req.user._json.email, // list of receivers
      subject: `¡Bienvenido a nuestra aplicación ${req.user.name.givenName}!`, // Subject line
      text: "Gracias por registrarte en nuestra aplicación. Esperamos que disfrutes de tu experiencia.", // plain text body
      //html: "<b>Hello world?</b>", // html body
    });
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
