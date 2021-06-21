const faqRouter = require('express').Router();
const Faq = require('../models/faq');

faqRouter.get('/', (req, res) => {
    Faq.findAll().then((faq) => res.status(200).json(faq))
        .catch((err) => res.status(500).send(`Error from Faq : ${err.message}`))
});

faqRouter.get('/:id', (req, res) => {
    Faq.find(faqId).then((faq) => res.status(200).json(faq))
        .catch((err) => res.status(500).send(`Error from Faq ${faqId} : ${err.message} `))
});


module.export = faqRouter;