const themeRouter = require('express').Router();
const Theme = require('../models/theme');

themeRouter.get('/', (req, res) => {
  Theme.findAll().then((themes) => res.status(200).json(themes))
    .catch((err) => res.status(500).send({ message: `Error retrieving faq: ${err.message}` }));
});

themeRouter.get('/:id', (req, res) => {
  const themeId = req.params.id;
  Theme.findId(themeId).then((theme) => res.status(200).json(theme))
    .catch((err) => res.status(500).send({ message: `Error retrieving faq: ${err.message}` }));
});

themeRouter.post('/', (req, res) => {
  Theme.create(req.body).then((result) => {
    const themeId = result.insertId;
    res.status(201).json({ id: themeId, ...req.body });
  }).catch((err) => res.status(500).send({ message: `Error while creating theme ressource: ${err.message}` }));
});

module.exports = themeRouter;
