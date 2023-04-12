const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { DB_PORT } = process.env;

conn.sync({ force: false }).then(() => {
  console.log("conectado a base de datos");
  server.listen(7872, () => {
    console.log(`listening at port: 7872`); // eslint-disable-line no-console
  });
});
