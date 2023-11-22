// const preference = require("../config/mercadoPago");
const mercadopago = require("mercadopago");

const { PUBLIC_URL } = process.env;
const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });
  console.log(req.body);
  const { body } = req;
  const preference = {
    items: [
      {
        title: body.title,
        quantity: body.quantity,
        currency_id: body.currency_id,
        unit_price: body.unit_price,
      },
    ],
    back_urls: {
      success: "https://medconnectfront-production.up.railway.app",
      failure: `${PUBLIC_URL}/failure`,
      pending: `${PUBLIC_URL}/pending`,
    },
    notification_url: "https://afa6-38-25-16-6.sa.ngrok.io/webhook",
  };

  const result = await mercadopago.preferences.create(preference);

  res.send(result.body);
};

const recieveWebhook = async (req, res) => {
  //   console.log(req.query);
  const payment = req.query;
  if (payment.type === "payment") {
    const data = await mercadopago.payment.findById(payment["data.id"]);
    console.log(data);
  }

  res.send("webhook");
};

module.exports = { createOrder, recieveWebhook };
