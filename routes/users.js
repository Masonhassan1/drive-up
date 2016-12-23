const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => {
      res.json("User added");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//update user
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.username = req.body.username


    //save to DB
    user
    .save()
    .then(() => res.json("Username updated now"))
    .catch((err) => res.status(400).json("Error:" + err));
  })
  .catch((err) => res.status(400).json("Error:" + err));
})

//get a single user and delete it by id
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});


module.exports = router;
