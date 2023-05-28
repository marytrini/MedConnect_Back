const preference = require("../config/mercadoPago");
const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
  const result = await mercadopago.preferences.create(preference);
  console.log(result);
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
