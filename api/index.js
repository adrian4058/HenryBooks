const server = require("./src/app.js");
const { conn } = require("./src/db.js");


conn.sync({ force: true }).then(() => {
  console.log("conectado a base de datos")
  server.listen(3000, () => {
    console.log('listening at port: 3000'); // eslint-disable-line no-console
  });
});

