const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
  console.log("conectado a base de datos");
  server.listen(7415, () => {
    console.log("listening at port: 7415"); // eslint-disable-line no-console
  });
});
