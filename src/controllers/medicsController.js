const { Medico, Specialization, City } = require("../sequelize/sequelize");

const getMedics = async (req, res) => {
  try {
    const data = await Medico.findAll({
      include: [
        {
          model: Specialization,
          attributes: ["name"],
          through: {
            //tabla intermedia
            attributes: [],
          },
        },
        {
          model: City,
          attributes: ["name"],
        },
      ],
      attributes: {
        exclude: ["cityId"],
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.send(error);
  }
};

const createMedic = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const newMedic = await Medico.create({
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      direccion: body.direccion,
      // officeId: body.officeId,
      cityId: body.cityId,
    });

    newMedic.addSpecializations(body.specializations.map((el) => Number(el)));

    res.status(200).json(newMedic);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { createMedic, getMedics };
