const funnelRouter = require('express').Router();
const Funnel = require('../models/funnel');
const { buildFunnel } = require('../utils/funnel').buildFunnel;

funnelRouter.get('/:id', (req, res) => {
  Funnel.find().then(([results]) => {
    const funnel = buildFunnel(results);
    res.status(200).json(funnel);
  })
    .catch((err) => {
      res.status(500).json({ message: `Error retrieving funnel: ${err.message}` });
    });
});

module.exports = funnelRouter;
