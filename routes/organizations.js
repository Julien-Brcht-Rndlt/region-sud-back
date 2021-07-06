const orgRouter = require('express').Router();
const Organization = require('../models/organization');
const Event = require('../models/event');
const { DUPLICATE_NAME, RESOURCE_NOT_FOUND, ORG_NAME_DUPLICATE } = require('../constants');

orgRouter.get('/', (req, res) => {
  Organization.findAll().then((organizations) => res.status(200).json(organizations))
    .catch((err) => res.status(500).send({ message: `Error retrieving organizations: ${err.message}` }));
});

orgRouter.get('/:id', (req, res) => {
  const orgId = req.params.id;
  Organization.find(orgId).then((organization) => {
    if (!organization) {
      res.status(404).json({ message: `Resource organization ${orgId} not found!` });
    } else {
      res.status(200).json(organization);
    }
  })
    .catch((err) => res.status(500).send({ message: `Error retrieving organization (#${orgId}): ${err.message}` }));
});

orgRouter.post('/', (req, res) => {
  const error = Organization.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const { orgName, orgStaff } = req.body;
    Organization.findByName(orgName)
      .then((results) => {
        if (results && results.length) {
          return Promise.reject(new Error(DUPLICATE_NAME));
        }
        console.log(req.body);
        return Organization.create(orgName, orgStaff);
      })
      .then((organization) => {
        res.status(201).json(organization);
      })
      .catch((err) => {
        if (err === DUPLICATE_NAME) {
          res.status(409).json({ message: 'This organization name is already used' });
        } else {
          res.status(500).send({ message: `Error saving the organization: ${err.message}` });
        }
      });
  }
});

orgRouter.put('/:id', (req, res) => {
  const error = Organization.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const orgId = req.params.id;
    let existingOrg = null;
    const { orgName } = req.body;
    Organization.find(orgId)
      .then((org) => {
        if (!org) {
          return Promise.reject(new Error(RESOURCE_NOT_FOUND));
        }
        existingOrg = org;
        return org;
      })
      .then(() => Organization.findByName(orgName))
      .then((results) => {
        if (results.length && results.filter((result) => result.orgName === orgName)) {
          return Promise.reject(new Error(ORG_NAME_DUPLICATE));
        }
        return Organization.modify(orgId, req.body);
      })
      .then(() => res.status(200).json({ ...existingOrg, ...req.body }))
      .catch((err) => {
        switch (err) {
        case RESOURCE_NOT_FOUND:
          res.status(404).json({ message: `Resource organization ${orgId} not found!` });
          break;
        case ORG_NAME_DUPLICATE:
          res.status(409).json({ message: 'organization name already in use' });
          break;
        default:
          res.status(500).send({ message: `Error while modifying organization resource : ${err.message} ` });
          break;
        }
      });
  }
});

orgRouter.delete('/:id', (req, res) => {
  const orgId = req.params.id;
  Organization.find(orgId).then((organization) => {
    if (!organization) {
      return Promise.reject(new Error(RESOURCE_NOT_FOUND));
    }
    return Organization.remove(orgId);
  })
    .then(() => res.status(200).json({ message: `Resource organization ${orgId} has been definitaly removed` }))
    .catch((err) => {
      if (err === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource organization ${orgId} not found!` });
      } else {
        res.status(500).send({ message: `Error while modifying organization resource : ${err.message} ` });
      }
    });
});

orgRouter.post('/:id/events', (req, res) => {
  const orgId = req.params.id;
  const {
    title,
    address,
    loc,
    staff,
    startDate,
    endDate,
    activity,
    level,
  } = req.body;
  Event.create(
    title,
    address,
    loc,
    staff,
    startDate,
    endDate,
    activity,
    level,
    orgId,
  )
    .then(([result]) => {
      const eventId = result.insertId;
      res.status(200).json({ eventId, ...req.body });
    })
    .catch((err) => {
      switch (err) {
      case 'RESOURCE_NOT_FOUND':
        res.status(404).json({ message: `Resource organization ${orgId} not found!` });
        break;
      case 'INVALID_DATA':
        res.status(422).json({ message: 'invalid data' });
        break;
      default:
        res.status(500).send(`Error while modifying organization resource : ${err.message} `);
        break;
      }
    });
});

orgRouter.get('/:id/events', (req, res) => {
  const orgId = req.params.id;
  Organization.find(orgId)
    .then(() => {
      Event.findAllByOrg(orgId)
        .then(([results]) => {
          res.status(200).json(results);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: `Error retrieving events: ${err.message}` });
        });
    })
    .catch((err) => {
      if (err === 'RESOURCE_NOT_FOUND') {
        res.status(404).json({ message: `Resource organization ${orgId} not found!` });
      } else {
        res.status(500)
          .json({ message: `Error retrieving organization: ${err.message}` });
      }
    });
});

orgRouter.get('/:orgId/events/:eventId', (req, res) => {
  const { orgId } = req.params.orgId;
  const { eventId } = req.params.eventId;
  Organization.find(orgId)
    .then(() => {
      Event.find(eventId)
        .then(([results]) => {
          res.status(200).json(results[0]);
        })
        .catch((err) => {
          if (err === 'RESOURCE_NOT_FOUND') {
            res.status(404).json({ message: `Resource organization ${eventId} not found!` });
          } else {
            res
              .status(500)
              .json({ message: `Error retrieving events: ${err.message}` });
          }
        });
    })
    .catch((err) => {
      if (err === 'RESOURCE_NOT_FOUND') {
        res.status(404).json({ message: `Resource organization ${orgId} not found!` });
      } else {
        res.status(500)
          .json({ message: `Error retrieving organization: ${err.message}` });
      }
    });
});

module.exports = orgRouter;
