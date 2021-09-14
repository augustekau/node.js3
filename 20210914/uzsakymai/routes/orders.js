//pirmas zingsnis
const express = require("express");
const router = express.Router();
const Order = require("../model/order");

router.get("/ordersall", (req, res, next) => {
  Order.find({})
    .then((orders) => {
      res.send(orders);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/orders/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;
  Order.findById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/orders/service/:id", (req, res, next) => {
  //Paimame id iš URL
  //Jei url butų localhost:3000/feedback/2d3d12231d4   , tuomet id = 2d3d12231d4
  const id = req.params.id;

  Order.find({
    service_id: id,
  })
    .then((order) => {
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/orders", (req, res, next) => {
  const orders = new Order(req.body);
  orders
    .save()
    .then(() => {
      res.status(201).send(orders);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = router;
