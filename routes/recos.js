const recoRouter = require('express').Router();
const Reco = require('../models/reco');
const { DUPLICATE_TITLE, RESOURCE_NOT_FOUND } = require('../constants');

recoRouter.get('/', (req, res) => {
  Reco.findAll()
    .then(([results]) => res.status(200).json(results))
    .catch((err) => res.status(500).json({ message: `Error while retrieving recommandations : ${err.message}` }));
});

recoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Reco.find(id)
    .then((reco) => res.status(200).json(reco))
    .catch((err) => res.status(500).json({ message: `Error while retrieving recommandation #${id} : ${err.message}` }));
});

recoRouter.post('/', (req, res) => {
  Reco.findByTitle()
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
  const { recoId } = req.params;
  Reco.find(recoId)
    .then((reco) => {
      if (!reco) {
        return Promise.reject(new Error(RESOURCE_NOT_FOUND));
      }
      return reco;
    })
    .then((reco) => Reco.modify(recoId, reco, req.body))
    .then((updatedReco) => res.status(200).json(updatedReco))
    .catch((err) => {
      if (err.message === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource organization ${recoId} not found!` });
      } else {
        res.status(500).json({ message: `Error while modifying resource recommandation #${recoId}: ${err.message}` });
      }
    });
});

recoRouter.delete('/:id', (req, res) => {
  const { recoId } = req.params;
  Reco.remove(recoId)
    .then((result) => {
      console.log(result);
      if (result.affectedRows) {
        res.status(204).json({ message: `Resource recommandation ${recoId} has been definitely removed` });
      }
    })
    .catch((err) => res.status(500).json({ message: `Error while removing resource recommandation #${recoId}: ${err.message}` }));
});

module.exports = recoRouter;
