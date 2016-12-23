const router = require("express").Router();
const Drive = require("../models/drive.model");

//get all drives
router.route("/").get((req, res) => {
  Drive.find()
    .then((drive) => res.json(drive))
    .catch((err) => res.status(400).json("Error:" + err));
});

//add drive
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = Date.parse(req.body.date);

  const newDrive = new Drive({
    username,
    description,
    duration,
    date,
  });

  newDrive
    .save()
    .then(() => {
      res.json("Drive added");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//get a single drive
router.route("/:id").get((req, res) => {
  Drive.findById(req.params.id)
    .then((drive) => res.json(drive))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get a single drive and delete it
router.route("/delete/:id").delete((req, res) => {
  Drive.findByIdAndDelete(req.params.id)
    .then(() => res.json("Drive deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update a drive
router.route("/update/:id").post((req, res) => {
  Drive.findById(req.params.id)
    .then((drive) => {
      drive.username = req.body.username;
      drive.description = req.body.description;
      drive.duration = Number(req.body.duration);
      drive.date = Date.parse(req.body.date);

      drive
        .save()
        .then(() => res.json("Drive updated succesfully"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
