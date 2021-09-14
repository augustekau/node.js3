const express = require("express");
const router = express.Router();
const Service = require("../model/service");

//vietoj -- .then((services) => -- "services" gali buti parasyta belekas

router.get("/services", (req, res, next) => {
  Service.find({})
    .then((services) => {
      res.send(services);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/services/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;
  Service.findById(id)
    .then((service) => {
      if (!service) {
        return res.status(404).send();
      }
      res.send(service);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/service", (req, res, next) => {
  const services = new Service(req.body);
  services
    .save()
    .then(() => {
      res.status(201).send(services);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = router;
