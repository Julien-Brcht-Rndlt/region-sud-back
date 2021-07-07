const eventRouter = require('express').Router();
const Event = require('../models/event');
const { RESOURCE_NOT_FOUND } = require('../constants');

eventRouter.get('/', (req, res) => {
  Event.findAll().then((events) => res.status(200).json(events))
    .catch((err) => res.status(500).send(`Error retrieving events: ${err.message}`));
});

eventRouter.get('/:id', (req, res) => {
  const eventId = req.params.id;
  Event.find(eventId).then((event) => {
    if (!event || !event.length) {
      res.status(404).json({ message: `Resource event ${eventId} not found!` });
    } else {
      res.status(200).json(event);
    }
  })
    .catch((err) => res.status(500).send(`Error retrieving event (#${eventId}): ${err.message}`));
});

eventRouter.post('/', (req, res) => {
  const error = Event.validate(req.body);
  if (error) {
    res.status(422).json({ message: `INVALIDE_DATA: ${error}` });
  } else {
    Event.create(req.body)
      .then((event) => {
        res.status(201).json(event);
      })
      .catch((err) => {
        res.status(500).send({ message: `Error while creating event resource : ${err.message}` });
      });
  }
});

eventRouter.put('/:id', (req, res) => {
  const error = Event.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const eventId = req.params.id;
    let existingEvent = null;
    Event.find(eventId)
      .then((event) => {
        if (!event) {
          return Promise.reject(new Error(RESOURCE_NOT_FOUND));
        }
        existingEvent = event;
        return Event.modify(eventId, req.body);
      })
      .then(() => res.status(200).json({ ...existingEvent, ...req.body }))
      .catch((err) => {
        switch (err.message) {
        case RESOURCE_NOT_FOUND:
          res.status(404).json({ message: `Resource event ${eventId} not found!` });
          break;
        default:
          res.status(500).send({ message: `Error while modifying event resource : ${err.message}` });
          break;
        }
      });
  }
});

eventRouter.delete('/:id', (req, res) => {
  const eventId = req.params.id;
  Event.find(eventId).then((event) => {
    if (!event) {
      return Promise.reject(new Error(RESOURCE_NOT_FOUND));
    }
    return Event.remove(eventId);
  })
    .then(() => res.status(200).json({ message: `Resource event ${eventId} has been definitaly removed` }))
    .catch((err) => {
      if (err === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource event ${eventId} not found!` });
      } else {
        res.status(500).send(`Error while modifying event resource : ${err.message} `);
      }
    });
});

module.exports = eventRouter;
