const { httpServer, app } = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: true });
httpServer.listen(
  app.get("port"),
  console.log(`Server running on: http://localhost:${app.get("port")}`)
);
