const faqRouter = require('express').Router();
const Faq = require('../models/faq');

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
  Faq.create()
    .then(([insertId]) => {
      res.status(201).json({ id: insertId, ...req.body });
    })
    .catch((err) => {
      if (err === 'DUPLICATE_QUESTION') {
        res.status(409).json({ message: 'This question already exist' });
      } else if (err === 'INVALIDE_DATA') {
        res.status(422).json({ message: 'INVALIDE_DATA' });
      } else {
        res.status(500).send('Error saving content');
      }
    });
});
faqRouter.put('/:id', (req, res) => {
  const faqId = req.params.id;
  Faq.modify(req.body)
    .then(() => {
      res.status(200).json({ id: faqId, ...req.body });
    })
    .catch((err) => {
      switch (err) {
      case 'THE_QUESTION_ALREADY_EXISTS':
        res.status(404).json({ message: `this ${faqId} can't change` });
        break;
      case 'CANT_CHANGE':
        res.status(422).json({ message: 'the content has not been changed' });
        break;
      case 'QUESTION_DUPLICATE':
        res.status(409).json({ message: 'the question exists' });
        break;
      default:
        res.status(500).send({ message: `Error with FAQ : ${err.message} ` });
        break;
      }
    });
});

faqRouter.delete('/:id', (req, res) => {
  const faqId = req.params.id;
  Faq.remove(faqId)
    .then(() => {
      res.status(200).json({ message: `this ${faqId} was deleted ` });
    })
    .catch((err) => {
      if (err === 'RESOURCE_NOT_FOUND') {
        res.status(404).json({ message: `Resource event ${faqId} not found!` });
      } else {
        res.status(500).send(` Error with FAQ : ${err.message} `);
      }
    });
});

module.exports = faqRouter;
