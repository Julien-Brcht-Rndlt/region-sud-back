const evalRouter = require('express').Router();
const Eval = require('../models/eval');
const Event = require('../models/event');
const { evalScoresBuildJSON, buildEvalAnswersEventJSON } = require('../utils/eval').evalScoresBuildJSON;

evalRouter.get('/events/:eventId/scores', (req, res) => {
  const { eventId } = req.params.eventId;
  Event.find(eventId)
    .then(() => {
      Eval.findEventScores(eventId).then(([results]) => {
        const evalScoresEvent = evalScoresBuildJSON(results);
        res.status(200).json(evalScoresEvent);
      })
        .catch((err) => {
          res.status(500).json({ message: `Error while retrieving eval scores for event ${eventId} :${err.message}` });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error while retrieving event ${eventId} :${err.message}` });
    });
});

evalRouter.get('/events/:eventId/answers', (req, res) => {
  const { eventId } = req.params.eventId;
  Event.find(eventId)
    .then(() => {
      Eval.findEventAnswers(eventId).then(([results]) => {
        const evalAnswersEvent = buildEvalAnswersEventJSON(results);
        res.status(200).json(evalAnswersEvent);
      })
        .catch((err) => {
          res.status(500).json({ message: `Error while retrieving eval answers for event ${eventId} :${err.message}` });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error while retrieving event ${eventId} :${err.message}` });
    });
});

module.exports = evalRouter;
