const mercadopago = require("mercadopago");
const { Payment } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const ACCESS_TOKEN = process.env;

const createOrder = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: ACCESS_TOKEN,
    });

    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Appointment",
          unit_price: 200,
          currency_id: "PEN",
          quantity: 1,
        },
      ],
    });
    console.log(result);

    res.status(200).json({ message: "Orden creada" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createOrder };
