const { httpServer, app } = require("./src/app.js");
const { conn } = require("./src/sequelize/sequelize");

conn.sync({ force: false });
httpServer.listen(
  app.get("port"),
  console.log(`Server running on: http://localhost:${app.get("port")}`)
);
