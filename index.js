const { httpServer, app } = require("./src/app.js");
const { conn, Administrator } = require("./src/sequelize/sequelize");

app.set("port", process.env.PORT || 4000);

conn.sync({ force: true }).then(async function () {

  await Administrator.create(
    {
      email: "cuentaparaestudiosf@gmail.com",
      password: "Aezakmi11",
      firstName: "Federico",
      lastName: "Carusso",
      phone: "+541170835651",
      role: "master",
      userType: "admin"
    })

  httpServer.listen(
    app.get("port"),
    console.log(`Server running on: http://localhost:${app.get("port")}`)
  );

})

