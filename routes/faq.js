const faqRouter = require('express').Router();
const Faq = require('../models/faq');
const { RESOURCE_DUPLICATE, RESOURCE_NOT_FOUND } = require('../constants');

faqRouter.get('/', (req, res) => {
  Faq.findAll()
    .then((faq) => res.status(200).json(faq))
    .catch((err) => res.status(500).send(`Error retrieving faq: ${err.message}`));
});

faqRouter.get('/:id', (req, res) => {
  const faqId = req.params.id;
  Faq.find(faqId)
    .then((faq) => {
      if (!faq) {
        res.status(404).json({ message: `Resource faq ${faqId} not found!` });
      } else {
        res.status(200).json(faq);
      }
    })
    .catch((err) => res.status(500).send(`Error retrieving faq (#${faqId}): ${err.message}`));
});

faqRouter.post('/', (req, res) => {
  const error = Faq.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const { question, answer } = req.body;
    Faq.findByQuestion(question)
      .then((results) => {
        if (results && results.length) {
          return Promise.reject(new Error(RESOURCE_DUPLICATE));
        }
        return Faq.create({ question, answer });
      })
      .then((faq) => res.status(201).json(faq))
      .catch((err) => {
        if (err === RESOURCE_DUPLICATE) {
          res.status(409).json({ message: 'This question already exist' });
        } else {
          console.log(err === RESOURCE_DUPLICATE);
          res.status(500).send({ message: `Error saving faq content: ${err.message}` });
        }
      });
  }
});
faqRouter.put('/:id', (req, res) => {
  const error = Faq.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const faqId = req.params.id;
    let existingFaq = null;
    Faq.find(faqId)
      .then((faq) => {
        if (!faq) {
          return Promise.reject(new Error(RESOURCE_NOT_FOUND));
        }
        existingFaq = faq;
        return Faq.modify(faqId, req.body);
      })
      .then(() => res.status(200).json({ ...existingFaq, ...req.body }))
      .catch((err) => {
        switch (err) {
        case RESOURCE_NOT_FOUND:
          res.status(404).json({ message: `Resource faq ${faqId} not found!` });
          break;
        default:
          res.status(500).send({ message: `Error with FAQ : ${err.message} ` });
          break;
        }
      });
  }
});

faqRouter.delete('/:id', (req, res) => {
  const faqId = req.params.id;
  Faq.find(faqId).then((faq) => {
    if (!faq) {
      return Promise.reject(new Error(RESOURCE_NOT_FOUND));
    }
    return Faq.remove(faqId);
  })
    .then(() => res.status(200).json({ message: `Resource faq ${faqId} has been definitely removed` }))
    .catch((err) => {
      if (err === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource faq ${faqId} not found!` });
      } else {
        res.status(500).send(`Error while modifying faq resource : ${err.message} `);
      }
    });
});

module.exports = faqRouter;
