const mercadopago = require("mercadopago");
const { handleHttpError } = require("../utils/handleError");
const { ACCESS_TOKEN } = process.env;
console.log(ACCESS_TOKEN);

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
        success: "http://localhost:3001/success",
        failure: "http://localhost:3001/failure",
        pending: "http://localhost:3001/pending",
      },
      notification_url: "https://f769-200-106-43-130.sa.ngrok.io/webhook",
    });
    console.log(result);

    res.status(200).json(result.body);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
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
