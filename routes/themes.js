const themeRouter = require('express').Router();
const Theme = require('../models/theme');

themeRouter.get('/', (req, res) => {
  Theme.findAll().then((themes) => res.status(200).json(themes))
    .catch((err) => res.status(500).send({ message: `Error retrieving faq: ${err.message}` }));
});

themeRouter.get('/:id', (req, res) => {
  const themeId = req.params.id;
  Theme.find(themeId).then((theme) => {
    if (!theme) {
      res.status(404).json({ message: `Resource theme ${themeId} not found!` });
    } else {
      res.status(200).json(theme);
    }
  })
    .catch((err) => res.status(500).send({ message: `Error retrieving theme: ${err.message}` }));
});

themeRouter.post('/', (req, res) => {
  const error = Theme.validate(req.body);
  if (error) {
    res.status(422).json({ message: `INVALIDE_DATA: ${error}` });
  }
  Theme.create(req.body).then((theme) => {
    res.status(201).json(theme);
  }).catch((err) => res.status(500).send({ message: `Error while creating theme ressource: ${err.message}` }));
});

module.exports = themeRouter;
