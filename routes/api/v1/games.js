var express = require('express');
var router = express.Router();
var Game = require('../../../models').Game;

/* GET all games */
router.get("/", function(req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

/* Get single game */
router.get("/:id/", function(req, res, next) {
  Game.findByPk(req.params.id)
    .then(game => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({error});
    });
});

/* create new game */
router.post("/", function(req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

/* update a game */
router.put("/:id/", function(req, res, next) {
  Game.update({
      title: req.body.title,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      active: req.body.active
    },
    {
      returning: true,
      where: {
        id: parseInt(req.params.id)
      }
    })
    .then(([gameCount, affectedGames]) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(202).send(JSON.stringify(affectedGames));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({error});
    });
});

router.delete("/:id/", function(req, res, next) {
  Game.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  })
  .then(game => {
    res.setHeader('Content-Type', 'application/json');
    res.status(204).send();
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
});


module.exports = router;
