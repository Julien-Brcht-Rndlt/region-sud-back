const adminRouter = require('express').Router();
const Admin = require('../models/admin');
const { USERNAME_DUPLICATE, EMAIL_DUPLICATE, RESOURCE_NOT_FOUND } = require('../constants');

adminRouter.get('/', (req, res) => {
  Admin.findAll().then((admins) => res.status(200).json(admins))
    .catch((err) => res.status(500).json({ message: `Error from Admin : ${err.message}` }));
});

adminRouter.get('/:id', (req, res) => {
  const adminId = req.params.id;
  Admin.find(adminId).then((admin) => {
    if (!admin) {
      res.status(404).json({ message: `Resource admin ${adminId} not found!` });
    } else {
      res.status(200).json(admin);
    }
  })
    .catch((err) => {
      res.status(500).json({ message: `Error from Admin ${adminId} : ${err.message}` });
    });
});

adminRouter.post('/', (req, res) => {
  const error = Admin.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const { username, email } = req.body;
    Admin.findMany({ username, email })
      .then((results) => {
        if (results && results.length) {
          if (results.find((result) => result.username === username)) {
            return Promise.reject(new Error(USERNAME_DUPLICATE));
          }
          if (results.find((result) => result.email === email)) {
            return Promise.reject(new Error(EMAIL_DUPLICATE));
          }
        }
        return Admin.create(req.body);
      })
      .then((admin) => {
        res.status(201).json(admin);
      })
      .catch((err) => {
        switch (err.message) {
        case USERNAME_DUPLICATE:
          res.status(409).json({ message: 'username already in use' });
          break;
        case EMAIL_DUPLICATE:
          res.status(409).json({ message: 'email already in use' });
          break;
        default:
          res.status(500).json({ message: `Error while creating admin resource : ${err.message}` });
          break;
        }
      });
  }
});

adminRouter.put('/:id', (req, res) => {
  const error = Admin.validate(req.body);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const adminId = req.params.id;
    let existingAdmin = null;
    const { username, email } = req.body;
    Admin.find(adminId)
      .then((admin) => {
        if (!admin) {
          return Promise.reject(new Error(RESOURCE_NOT_FOUND));
        }
        existingAdmin = admin;
        return admin;
      })
      .then(() => Admin.findMany({ username, email }))
      .then((results) => {
        if (results.length) {
          if (existingAdmin.username !== username
            && results.find((result) => result.username === username)) {
            return Promise.reject(new Error(USERNAME_DUPLICATE));
          }
          if (existingAdmin.email !== email
            && results.find((result) => result.email === email)) {
            return Promise.reject(new Error(EMAIL_DUPLICATE));
          }
        }
        return Admin.modify(adminId, req.body);
      })
      .then(() => res.status(200).json({ ...existingAdmin, ...req.body, password: '' }))
      .catch((err) => {
        switch (err.message) {
        case RESOURCE_NOT_FOUND:
          res.status(404).json({ message: `Resource admin ${adminId} not found!` });
          break;
        case USERNAME_DUPLICATE:
          res.status(409).json({ message: 'username already in use' });
          break;
        case EMAIL_DUPLICATE:
          res.status(409).json({ message: 'email already in use' });
          break;
        default:
          res.status(500).json({ message: `Error while modifying admin resource : ${err.message}` });
          break;
        }
      });
  }
});

adminRouter.patch('/:id', (req, res) => {
  const error = Admin.validate(req.body, false);
  if (error) {
    res.status(422).json({ message: `Invalid data: ${error}` });
  } else {
    const adminId = req.params.id;
    let existingAdmin = null;
    Admin.find(adminId)
      .then((admin) => {
        if (!admin) {
          return Promise.reject(new Error(RESOURCE_NOT_FOUND));
        }
        existingAdmin = admin;
        return Admin.modifyPatch(adminId, req.body);
      })
      .then(() => {
        res.status(200).json({ ...existingAdmin, ...req.body, password: '' });
      })
      .catch((err) => {
        switch (err.message) {
        case RESOURCE_NOT_FOUND:
          res.status(404).json({ message: `Resource admin ${adminId} not found!` });
          break;
        default:
          res.status(500).json({ message: `Error while modifying admin resource : ${err.message}` });
          break;
        }
      });
  }
});

adminRouter.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  Admin.find(adminId).then((admin) => {
    if (!admin) {
      return Promise.reject(new Error(RESOURCE_NOT_FOUND));
    }
    return Admin.remove(adminId);
  })
    .then(() => res.status(200).json({ message: `Resource admin ${adminId} has been definitely removed` }))
    .catch((err) => {
      if (err.message === RESOURCE_NOT_FOUND) {
        res.status(404).json({ message: `Resource admin ${adminId} not found!` });
      } else {
        res.status(500).json({ message: `Error while removing admin resource ${adminId} : ${err.message}` });
      }
    });
});

module.exports = adminRouter;
