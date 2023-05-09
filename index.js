const { httpServer, app } = require("./src/app.js");
const { conn } = require("./src/sequelize/sequelize");

app.set("port", process.env.PORT || 4000);

conn.sync({ force: true });
httpServer.listen(
  app.get("port"),
  console.log(`Server running on: http://localhost:${app.get("port")}`)
);
