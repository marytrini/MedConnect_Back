const { User, Patient, PatientsReview } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getReviews = async (req, res) => {
  try {
    const data = await PatientsReview.findAll({
      include: [
        {
          model: User,
          where: { role: "medico" },
          attributes: ["first_name", "last_name"],
        },
      ],
      attributes: {
        exclude: ["patientId", "UserId"],
      },
    });

    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { body } = req;

    const newReview = await PatientsReview.create(body);

    if (Object.keys(newReview).length === 0) {
      handleHttpError(res, "Error al crear review", 404);
      return;
    }
    res.status(200).json(newReview);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await PatientsReview.findByPk(id);

    if (!review) {
      return handleHttpError(res, `review con id ${id} no encontrada`, 404);
    }
    await review.destroy();

    res.status(200).json({ message: "review eliminada" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};
module.exports = { createReview, getReviews, deleteReview };
