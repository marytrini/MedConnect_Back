const mercadopago = require("mercadopago");
const { PUBLIC_URL } = process.env;

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
    success: `${PUBLIC_URL}/success`,
    failure: `${PUBLIC_URL}/failure`,
    pending: `${PUBLIC_URL}/pending`,
  },
  notification_url: "https://afa6-38-25-16-6.sa.ngrok.io/webhook",
};

module.exports = preference;
