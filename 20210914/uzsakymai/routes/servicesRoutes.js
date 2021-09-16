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

//redagavimas
router.patch("/services/:id", async (req, res) => {
  try {
    //Pasiimame seną feedback iš duomenų bazės
    const services = await Service.findById(req.params.id);

    //Iš atsiųsto JSON failo, paimame atsiųstų atnaujinti laukų sąrašą (masyvą)
    const updates = Object.keys(req.body);

    //Laukai kuriuos galime keisti
    const allowed = ["name", "description", "price"];

    //Ar visi atsiusti laukai iš masyvo updates yra allowed masyve
    if (!updates.every((update) => allowed.includes(update))) {
      //Jei ne nutraukiame vykdymą ir gražiname 400 klaida
      return res.status(400).send({ error: "Neteisingi atnaujinimo laukai" });
    }

    //Einame per visus atnaujinamus laukus
    updates.forEach((update) => {
      //Sename įraše pakeičiame laukų reikšmes naujomis
      services[update] = req.body[update];
    });
    //Išsaugome naują įrašą į duomenų bazę
    await services.save();

    //Išsiunčiame pakeistą įrašą
    res.send(services);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/services/:id", async (req, res) => {
  try {
    const services = await Service.findByIdAndDelete(req.params.id);
    if (!services) {
      return res.status(404).send({ error: "Irasas nerastas" });
    }
    return res.send(services);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
