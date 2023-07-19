const { transporter } = require("../middleware/mail");
const { Email } = process.env;

const mailContent = async (req, res, next) => {
  try {
    const { itemsCart, payerEmail } = req.body;
    const total_Price = itemsCart
      .map((e) => e.unit_price * e.quantity)
      .reduce((a, b) => a + b);
    const items = itemsCart.map((item) => {
      return `<li>Producto: ${item.title} - Cantidad: ${item.quantity} x $${item.unit_price}u</li>`;
    });

    if (itemsCart) {
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
        to: payerEmail, // list of receivers
        subject: "Compra Exitosa", // Subject line
        html: contentHTML,
      });

      res.json(send);
    } else {
      res.send("Mail no enviado");
    }
  } catch (error) {
    error;
  }
};

module.exports = {
  mailContent,
};
