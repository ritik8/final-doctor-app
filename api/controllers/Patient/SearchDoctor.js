const Doctors = require("../../../models/Doctor");

const findNearestDoctors = async (req, res, next) => {
  const { city, special } = req.params;
  try {
    const doctors = await Doctors.aggregate([
      {
        $match:{
          isApproved:"approved"
        },
        $lookup: {
          from: "councils",
          localField: "_id",
          foreignField: "doctor",
          as: "councilHour",
        },
      },
    ]);
    console.log("res", doctors);
    const doc = [];
    doctors.map((doctor) => {
      if (
        doctor.specialist.toLowerCase() === special.toLowerCase() &&
        doctor.location.address.city.toLowerCase() === city.toLowerCase()
      ) {
        doc.push(doctor);
      }
    });

    res.send(doc);
  } catch (error) {
    if (error) {
      console.log(error.message);
      next(error);
    }
  }
};

module.exports = {
  findNearestDoctors,
};
