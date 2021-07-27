const evalRouter = require('express').Router();
const Eval = require('../models/eval');
const Event = require('../models/event');
const Theme = require('../models/theme');
const Answer = require('../models/answer');
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

evalRouter.get('/events/:eventId/evals', (req, res) => {
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

evalRouter.post('/events/:eventId/themes/:themeId/scores', (req, res) => {
  const { eventId, themeId } = req.params;
  Event.find(eventId)
    .then((event) => {
      if (!event) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return Theme.find(themeId);
    })
    .then((theme) => {
      if (!theme) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      const { score } = req.body;
      return Eval.createThemeScore(eventId, themeId, score);
    })
    .then((themeScore) => res.status(201).json(themeScore))
    .catch((err) => {
      switch (err.message) {
      case RESOURCE_NOT_FOUND:
        res.status(404).json({ message: 'Resources for saving score eval NOT FOUND!' });
        break;
      default:
        res.status(500).send({ message: `Error while saving eval theme score : ${err.message} ` });
        break;
      }
    });
});

evalRouter.post('/events/:eventId/answers/:answerId', (req, res) => {
  const { eventId, answerId } = req.params;
  Event.find(eventId)
    .then((event) => {
      if (!event) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return Answer.find(answerId);
    })
    .then((answer) => {
      if (!answer) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      const { evalValue } = req.body;
      return Eval.createEvalAnswer(eventId, answerId, evalValue);
    })
    .then((evalAnswer) => {
      res.status(201).json(evalAnswer);
    })
    .catch((err) => {
      switch (err.message) {
      case RESOURCE_NOT_FOUND:
        res.status(404).json({ message: 'Resources for saving score eval NOT FOUND!' });
        break;
      default:
        res.status(500).send({ message: `Error while when saving eval answer value : ${err.message} ` });
        break;
      }
    });
});

module.exports = evalRouter;
