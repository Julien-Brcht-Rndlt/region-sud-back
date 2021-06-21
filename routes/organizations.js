const orgRouter = require('express').Router();
const Organization = require('../models/organization');

orgRouter.get('/', (req, res) => {
    Organization.findAll().then((organizations) => res.status(200).json(organizations))
                .catch((err) => res.status(500).send(`Error retrieving organizations: ${err.message}`));
});

orgRouter.get('/:id', (req, res) => {
    const orgId = req.params.id;
    Organization.find(orgId).then((organization) => res.status(200).json(organization))
                .catch((err) => res.status(500).send(`Error retrieving organization (#${orgId}): ${err.message}`));
});

module.exports = orgRouter;