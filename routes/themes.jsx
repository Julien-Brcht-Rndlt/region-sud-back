const themeRouter = require('express').Router();
const Theme = require('../models/theme');

// ajouter les routes

themeRouter.get('/', (req, res) => {
    Theme.findAll().then((themes) => res.status(200).json(themes))
            .catch((err) => res.status(500).send({ message: `Error retrieving faq: ${err.message}` }));
});

ThemeRouter.get('/:id', (req, res) => {
    const themeId = req.params.id;
    Theme.findId(themeId).then((theme) => res.status(200).json(theme))
    .catch((err) => res.status(500).send({ message: `Error retrieving faq: ${err.message}` }));
})

ThemeRouter.post('/', (req, res) => {
    Theme.create(req.body).then((result) => {
        const themeId = result.insertId;
      res.status(201).json({id: themeId, ...req.body});  
    }).catch((err) => res.status(500).send({message: `Error while creating theme ressource: ${err.message}`})
    )
})

module.exports = themeRouter;