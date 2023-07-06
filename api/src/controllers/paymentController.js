const axios = require("axios");
const { transporter } = require("../middleware/mail");
const { Email, TO } = process.env;

const createPayment = async (item, payer) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: item,
      payer: payer,
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
    console.log("PAYMENT____DATA", payment.data);
    const result = [payment.data.init_point];
    console.log("result", result);
    return result;
  } catch (error) {
    error;
  }
};

const linkPayment = async (req, res, next) => {
  try {
    const resultado = await createPayment(req.body.item, req.body.payer);
    const sendPayerMail = req.body.payer.email;
    const total_Price = req.body.item
      .map((e) => e.unit_price * e.quantity)
      .reduce((a, b) => a + b);
    const items = req.body.item.map((item) => {
      return `<li>Producto: ${item.title} - Cantidad: ${item.quantity} x $${item.unit_price}u</li>`;
    });

    contentHTML = `
      <h1>COMPRA REALIZADA CON ÉXITO</h1>
      <h2>Su compra fue realizada con éxito, su pedido detallado es:</h2>
      <ul>
        ${items.join("")}
      </ul>
      <h2>Gracias por tu compra, su total es: $${total_Price}</h2>
      `;

    const send = await transporter.sendMail({
      from: `${Email}`, // sender address
      to: sendPayerMail, // list of receivers
      subject: "Compra Exitosa", // Subject line
      html: contentHTML,
    });

    res.send(resultado).json(send);
    // res.send(resultado);
  } catch (error) {
    error;
  }
};

module.exports = {
  linkPayment,
  createPayment,
};
