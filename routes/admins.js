const adminRouteur = require('express').Router();
const Admin = require('../models/admin');

adminRouteur.get('/', (req, res) => {
  Admin.findAll().then((admins) => res.status(200).json(admins))
    .catch((err) => res.status(500).send(`Error from Admin : ${err.message}`));
});

adminRouteur.get('/:id', (req, res) => {
  const adminId = req.params.id;
  Admin.find(adminId).then((admin) => res.status(200).json(admin))
    .catch((err) => {
      if (err === 'RESOURCE_NOT_FOUND') {
        res.status(404).json({ message: `Resource admin ${adminId} not found!` });
      } else {
        res.status(500).send(`Error from Admin ${adminId} : ${err.message} `);
      }
    });
});

adminRouteur.post('/', (req, res) => {
/*     const { username, email, password } = req.body; */
  Admin.create(req.body).then((result) => {
    const adminId = result.insertId;
    res.status(201).json({ id: adminId, ...req.body });
  }).catch((err) => {
    switch (err) {
    case 'INVALID_DATA':
      res.status(422).json({ message: 'invalid data' });
      break;
    case 'USERNAME_DUPLICATE':
      res.status(409).json({ message: 'username already in use' });
      break;
    case 'EMAIL_DUPLICATE':
      res.status(409).json({ message: 'email already in use' });
      break;
    default:
      res.status(500).send(`Error while creating admin resource : ${err.message} `);
      break;
    }
  });
});

adminRouteur.put('/:id', (req, res) => {
/*     const { username, email, password } = req.body; */
  const adminId = req.params.id;
  Admin.modify(adminId, req.body).then(() => {
    res.status(200).json({ id: adminId, ...req.body });
  }).catch((err) => {
    switch (err) {
    case 'RESOURCE_NOT_FOUND':
      res.status(404).json({ message: `Resource admin ${adminId} not found!` });
      break;
    case 'INVALID_DATA':
      res.status(422).json({ message: 'invalid data' });
      break;
    case 'USERNAME_DUPLICATE':
      res.status(409).json({ message: 'username already in use' });
      break;
    case 'EMAIL_DUPLICATE':
      res.status(409).json({ message: 'email already in use' });
      break;
    default:
      res.status(500).send(`Error while modifying admin resource : ${err.message} `);
      break;
    }
  });
});

adminRouteur.delete('/:id', (req, res) => {
/*     const { username, email, password } = req.body; */
  const adminId = req.params.id;
  Admin.remove(adminId).then(() => {
    res.status(200).json({ message: `Resource admin ${adminId} has been definitaly removed` });
  }).catch((err) => {
    if (err === 'RESOURCE_NOT_FOUND') {
      res.status(404).json({ message: `Resource admin ${adminId} not found!` });
    } else {
      res.status(500).send(`Error while modifying admin resource : ${err.message} `);
    }
  });
});

module.exports = adminRouteur;
