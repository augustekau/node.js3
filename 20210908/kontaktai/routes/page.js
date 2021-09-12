const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", (req, res, next) => {
  //Paimame įrašus iš duomenų bazės
  db.collection("contacts")
    .find({})
    .toArray()
    .then((contacts) => {
      res.render("index", { contacts: contacts });
    })
    .catch((error) => {
      console.log("Klaida paimant įrašus");
    });
});

router.get("/new", async (req, res, next) => {
  let types = await db.collection("type").find({}).toArray();
  res.render("new", { types: types });
});

router.post("/new", (req, res, next) => {
  //Idedame įrašus į duomenų bazę
  db.collection("contacts")
    .insertOne(req.body)
    .then((result) => {
      res.redirect("/");
    });
});

router.get("/edit", async (req, res, next) => {
  const contact = await db.collection("contacts").findOne({
    _id: new ObjectId(req.query.id),
  });
  let types = await db.collection("type").find({}).toArray();
  res.render("edit", { contact: contact, types: types });
});

router.post("/edit", async (req, res, next) => {
  db.collection("contacts").updateOne(
    {
      _id: new ObjectId(req.query.id),
    },
    { $set: req.body }
  );
  res.redirect("/");
});

router.get("/delete", (req, res, next) => {
  db.collection("contacts").deleteOne({
    _id: new ObjectId(req.query.id),
  });
  res.redirect("/");
});

module.exports = router;
