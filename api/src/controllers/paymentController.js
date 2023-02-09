const axios = require("axios");

const createPayment = async (item) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    
    const body = {
      items: item,

      back_urls: {
        failure: "http://localhost:3000/home",
        pending: "http://localhost:3000/home",
        success: "http://localhost:3000/home",
      },
    };
 
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    const result = [payment.data.init_point];
    console.log("result",result)                                                                               
    return result;
  } catch (error) {
    error;
  }
};

const linkPayment = async (req, res, next) => {
  try {
    const resultado = await createPayment(req.body.item);
    res.send(resultado);
  } catch (error) {
    error;
  }
};

module.exports = {
  linkPayment,
  createPayment,
};
