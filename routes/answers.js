const answerRouter = require('express').Router();
const Answer = require('../models/answer');
const Reco = require('../models/reco');
const { RESOURCE_NOT_FOUND } = require('../constants');

answerRouter.get('/:id/recommandations', (req, res) => {
  const { id } = req.params;
  Answer.find(id)
    .then(() => Reco.findByAnswer(id))
    .then((recos) => res.status(200).json(recos))
    .catch((err) => {
      if (err.message === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource answer ${id} not found!` });
      } else {
        res.status(500).json({ message: `Error when retrieving recommandations for answer ${id}` });
      }
    });
});

module.exports = answerRouter;
