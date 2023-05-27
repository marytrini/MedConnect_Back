const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const preference = {
  items: [
    {
      title: "Laptop",
      quantity: 2,
      currency_id: "PEN",
      unit_price: 500,
    },
  ],
  back_urls: {
    success: "http://localhost:3001/success",
    failure: "http://localhost:3001/failure",
    pending: "http://localhost:3001/pending",
  },
  notification_url: "https://afa6-38-25-16-6.sa.ngrok.io/webhook",
};

module.exports = preference;
