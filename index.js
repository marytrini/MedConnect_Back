const server = require("./src/app");
const { conn } = require("./src/sequelize/sequelize");

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
