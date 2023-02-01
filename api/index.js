const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { DB_PORT } = process.env;

conn.sync({ force: false }).then(() => {
  console.log("conectado a base de datos");
  server.listen(DB_PORT, () => {
    console.log(`listening at port: ${DB_PORT}`); // eslint-disable-line no-console
  });
});