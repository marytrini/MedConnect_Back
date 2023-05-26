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
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      notification_url: "http://localhost:3000/webhook",
    });
    console.log(result);

    res.status(200).json({ message: "Orden creada" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createOrder };
