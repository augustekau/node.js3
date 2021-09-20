const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const User = require("./../model/user");

router.get("/user", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

module.exports = router;
