const funnelRouter = require('express').Router();
const Funnel = require('../models/funnel');
const { buildFunnelJSON } = require('../utils/funnel');

funnelRouter.get('/', (req, res) => {
  console.log('request from front');
  Funnel.find().then(([results]) => {
    const funnel = buildFunnelJSON(results);
    res.status(200).json(funnel);
  })
    .catch((err) => {
      res.status(500).json({ message: `Error retrieving funnel: ${err.message}` });
      console.error(err);
    });
});

module.exports = funnelRouter;
