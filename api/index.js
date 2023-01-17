const server = require("./src/app.js");
const { conn } = require("./src/db.js");


server.listen(3001, () => {
  console.log(`%s listening at 3000`);
  try {
    conn.sync().catch((e) => {
      console.log(e);
    });
  } catch (e) {
    console.log("Error!!");
  }
});
