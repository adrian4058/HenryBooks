const axios = require("axios");


const createPayment = async (item, payer) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: item,
      payer: payer,
      back_urls: {
        failure: "http://localhost:3000/home",
        pending: "http://localhost:3000/home",
        success: "http://localhost:3000/payments",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    console.log("PAYMENT____DATA", payment.data);
    const result = [payment.data.init_point];
    return result;
  } catch (error) {
    error;
  }
};

const linkPayment = async (req, res, next) => {
  try {
    const resultado = await createPayment(req.body.item, req.body.payer);
    res.send(resultado);
  } catch (error) {
    error;
  }
};



module.exports = {
 
  linkPayment,
  createPayment,
};
