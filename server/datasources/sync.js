const Seq = require("./database");

// Seq.modules();

Seq.db
  .sync()
  .then(() => {
    console.log("\x1b[44m%s\x1b[0m", "Sucess!");
    process.exit();
  })
  .catch(error => {
    console.log("\x1b[41m%s\x1b[0m", "Error details: \n" + error);
    process.exit();
  });
