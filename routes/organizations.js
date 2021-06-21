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

orgRouter.post('/organization', (req, res) => {
    const { orgName, orgStaff } = req.body;
    Organization.create(orgId)
                .then(([insertId]) => {
                    res.status(201).json({id: insertId, ...req.body});
                })
                .catch((err) => {
                    if (err === 'DUPLICATE_NAME') {
                        res.status(409).json({ message: 'This organization name is already used'});
                    }
                    else if(err === 'INVALIDE_DATA') {
                        res.status(422).json({/* validationError */})
                    }
                    else {
                        res.status(500).send('Error saving the organization');
                    } 
                });
});

module.exports = orgRouter;