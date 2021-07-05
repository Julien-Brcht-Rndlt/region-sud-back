const evalRouter = require('express').Router();
const Eval = require('../models/eval');
const Event = require('../models/event');
const { RESOURCE_NOT_FOUND } = require('../constants');
const { evalScoresBuildJSON, buildEvalAnswersEventJSON } = require('../utils/eval');

evalRouter.get('/events/:eventId/scores', (req, res) => {
  const { eventId } = req.params.eventId;
  Event.find(eventId)
    .then((event) => {
      if (!event) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return Eval.findEventScores(eventId);
    })
    .then(([results]) => {
      const evalScoresEvent = evalScoresBuildJSON(results);
      res.status(200).json(evalScoresEvent);
    })
    .catch((err) => {
      if (err === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource event ${eventId} not found!` });
      } else {
        res.status(500).json({ message: `Error while retrieving event ${eventId} :${err.message}` });
      }
    });
});

evalRouter.get('/events/:eventId/answers', (req, res) => {
  const { eventId } = req.params.eventId;
  Event.find(eventId)
    .then((event) => {
      if (!event) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return Eval.findEventAnswers(eventId);
    })
    .then(([results]) => {
      const evalAnswersEvent = buildEvalAnswersEventJSON(results);
      res.status(200).json(evalAnswersEvent);
    })
    .catch((err) => {
      if (err === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource event ${eventId} not found!` });
      } else {
        res.status(500).json({ message: `Error while retrieving event ${eventId} :${err.message}` });
      }
    });
});

/* evalRouter.post('/events/:eventId/scores', (req, res) => {
  const { eventId } = req.params.eventId;


}); */

module.exports = evalRouter;
