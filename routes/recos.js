const recoRouter = require('express').Router();
const Reco = require('../models/reco');
const { DUPLICATE_TITLE, RESOURCE_NOT_FOUND } = require('../constants');

recoRouter.get('/', (req, res) => {
  Reco.findAll()
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).json({ message: `Error while retrieving recommandations : ${err.message}` }));
});

recoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`get ${id}`);
  Reco.find(id)
    .then((reco) => {
      if (!reco) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return reco;
    })
    .then((reco) => res.status(200).json(reco))
    .catch((err) => {
      if (err.message === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource recommandation ${id} not found!` });
      } else {
        res.status(500).json({ message: `Error while retrieving recommandation #${id} : ${err.message}` });
      }
    });
});

recoRouter.post('/', (req, res) => {
  Reco.findByTitle(req.body.title)
    .then((results) => {
      if (results && results.length) {
        return Promise.reject(new Error(DUPLICATE_TITLE));
      }
      return Reco.create(req.body);
    })
    .then((reco) => res.status(201).json(reco))
    .catch((err) => {
      if (err.message === DUPLICATE_TITLE) {
        res.status(409).json({ message: 'Resource recommandation already exists' });
      } else {
        res.status(500).json({ message: `Error while creating a new resource recommandation: ${err.message}` });
      }
    });
});

recoRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Reco.find(id)
    .then((reco) => {
      if (!reco) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return reco;
    })
    .then((reco) => Reco.modify(id, reco, req.body))
    .then((updatedReco) => res.status(200).json(updatedReco))
    .catch((err) => {
      if (err.message === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource organization ${id} not found!` });
      } else {
        res.status(500).json({ message: `Error while modifying resource recommandation #${id}: ${err.message}` });
      }
    });
});

recoRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Reco.remove(id)
    .then((result) => {
      console.log(result.affectedRows);
      if (result.affectedRows) {
        res.status(200).json({ message: `Resource recommandation ${id} has been definitely removed` });
      } else {
        res.status(404).json({ message: `Resource organization ${id} not found!` });
      }
    })
    .catch((err) => res.status(500).json({ message: `Error while removing resource recommandation #${id}: ${err.message}` }));
});

module.exports = recoRouter;
