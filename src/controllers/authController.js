const { matchedData } = require("express-validator");
const { User } = require("../sequelize/sequelize");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const transporter = require("../config/mailer");
const { USER_EMAIL } = process.env;
const CLIENT_URL = "https://medconnect-clinica-production.up.railway.app";

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);

    // Check if email is already registered
    const user = await User.findOne({ where: { email: req.email } });
    if (user) {
      // return res.status(409).json({ error: "EMAIL_ALREADY_REGISTERED" });
      handleHttpError(res, "EMAIL_ALREADY_REGISTERED", 409);
    }
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await User.create(body);

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    //Enviar correo electrónico de confirmación o bienvenida al usuario

    await transporter.sendMail({
      from: '"Medconnect" <services.medconnect@gmail.com>', // sender address
      to: req.email, // list of receivers
      subject: `¡Bienvenido a nuestra aplicación ${req.first_name}!`, // Subject line
      text: "Gracias por registrarte en nuestra aplicación. Esperamos que disfrutes de tu experiencia.", // plain text body
      //html: "<b>Hello world?</b>", // html body
    });

    res.status(201).json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTRO");
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req);
    const user = await User.findOne({
      where: { email: req.email },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "password",
        "role",
      ],
    });
    if (!user) {
      handleHttpError(res, "USER_NO_REGISTRADO", 404);
      return;
    }
    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }
    const data = {
      token: await tokenSign(user),
      user,
    };

    const expirationTime = 24 * 60 * 60 * 1000;
    res.cookie("localSession", data.token, {
      expires: new Date(Date.now() + expirationTime),
      httpOnly: true,
    });
    res.send({ data });
    // return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("localSession");
  // res.send("Logged out successfully");
  res.redirect(CLIENT_URL);
};
const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
};

module.exports = { registerCtrl, loginCtrl, loginSuccess, logoutUser };
