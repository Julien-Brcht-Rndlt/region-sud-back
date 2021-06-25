const evalRouter = require('express').Router();
const Eval = require('../models/eval');
const Event = require('../modals/event');
const evalScoresBuild = require('utils').evalScoresBuild;

evalRouter.get('/events/:eventId/answers', (req, res) => {
    const eventId = req.params.eventId;
    Event.find(eventId)
        .then((orgEvent) => {
            orgEvent
            Eval.findEventScores(eventId).then(([results]) => {
                const evalScoresEvent = evalScoresBuild(results);
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

module.exports = evalRouter;