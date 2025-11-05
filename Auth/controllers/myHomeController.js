const HomeModel = require("../models/HomeModel");
let getMyHome = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    let homes = await HomeModel.find({ user: req.session.user._id });
    res.json({ homes });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getMyHome;
