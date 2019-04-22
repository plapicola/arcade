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

module.exports = router;
