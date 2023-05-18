const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const fs = require("fs");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getSpecializations = async (req, res) => {
  try {
    const { name } = req.query;

    const data = await Specialization.findAll();
    if (name) {
      let dataByName = await data.filter((obj) =>
        obj.name.toLowerCase().includes(name.toLowerCase())
      );
      dataByName.length
        ? res.status(200).json(dataByName)
        : handleHttpError(res, { message: "No existe la especialidad" }, 404);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    handleHttpError(res, "Error_List_Specializations");
  }
};

const getSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Specialization.findByPk(id);
    if (!data) {
      handleHttpError(res, `Specialization with ID ${id} not found`, 404);
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const createSpecializations = async (req, res) => {
  try {
    // const { file, body } = req;

    // const fileData = {
    //   description: body.description,
    //   name: body.name,
    //   url: `${PUBLIC_URL}/${file.filename}`,
    // };

    // const data = await Specialization.create(fileData);
    // res.status(201).json(data);

    const { body } = req;
    const newSpecialization = await Specialization.create(body);

    if (Object.keys(newSpecialization).length === 0) {
      handleHttpError(res, "Error al crear Especialidad", 404);
      return;
    }
    res.status(200).json(newSpecialization);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};
const deleteSpecializations = async (req, res) => {
  try {
    const { id } = req.params;
    const dataFile = await Specialization.findByPk(id);
    // console.log(dataFile);
    if (!dataFile) {
      handleHttpError(res, `Specialization with ID ${id} not found`, 404);
    }
    await dataFile.destroy();

    const { url } = dataFile;
    const filename = url.split("/").pop();
    console.log(url);
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = {
  createSpecializations,
  getSpecializations,
  deleteSpecializations,
  getSpecialization,
};
