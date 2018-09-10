const Seq = require("./database");

Seq.db
  .sync({
    force: true
  })
  .then(() => {
    console.log("\x1b[44m%s\x1b[0m", "Sucess!");
    process.exit();
  })
  .catch(error => {
    console.log("\x1b[41m%s\x1b[0m", "Error details: \n" + error);
    process.exit();
  });