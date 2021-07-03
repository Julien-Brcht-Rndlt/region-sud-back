const Joi = require('joi');
const connection = require('../db-config');

const validation = ({ orgName, orgStaff }) => {
  const validationErrors = Joi.object({
    orgName: Joi.string().email().max(255).required(),
    orgStaff: Joi.number().orgStaff().max().required(),
  }).validate({ orgName, orgStaff }, { abortEarly: false }).error;
  return validationErrors;
};

const findAll = () => {
  const sql = 'SELECT * FROM organization';
  return connection.promise().query(sql).then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM organization WHERE id = ?';
  connection.promise().query(sql, [id]).then(([results]) => {
    if (!results.length) {
      return Promise.reject(new Error('RESOURCE_NOT_FOUND'));
    }
    return results[0];
  });
};

const findByName = (orgName) => {
  const sql = 'SELECT * FROM organization WHERE orgName = ?';
  return connection.promise
    .query(sql,
      [orgName]).then(([results]) => results);
};

const create = ({ orgName, orgStaff }) => {
  const validationErrors = validation({ orgName, orgStaff });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  findByName(orgName).then((results) => {
    if (results.lenght) {
      return Promise.reject(new Error('DUPLICATE_NAME'));
    }
    return results;
  });
  const sql = 'INSERT INTO organization (orgName, orgStaff) VALUES (?, ?)';
  return connection.promise()
    .query(sql,
      [orgName, orgStaff]).then(([{ insertId }]) => ({ insertId, orgName, orgStaff }));
};

// patch
const modify = (id, { orgName, orgStaff }) => {
  const validationErrors = validation({ orgName, orgStaff });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then(() => {
    findByName(orgName).then((results) => {
      if (results.lenght) {
        return Promise.reject(new Error('DUPLICATE_NAME'));
      }
      return results;
    });
    const sql = 'UPDATE organization SET ? WHERE id = ?';
    const valuesToUpdate = { orgName, orgStaff };
    return connection.promise.query(sql, [{ orgName, orgStaff, ...valuesToUpdate }, id]);
  }).catch((err) => Promise.reject(new Error(err)));
};

// put
const modifyAll = (id, { orgName, orgStaff }) => {
  const validationErrors = validation({ orgName, orgStaff });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then(() => {
    // refactor code three times here + in create method + modify.
    findByName(orgName).then((results) => {
      if (results.lenght) {
        return Promise.reject(new Error('DUPLICATE_NAME'));
      }
      return results;
    });
    const sql = 'UPDATE admin SET ? WHERE id = ?';
    return connection.promise.query(sql, [{ orgName, orgStaff }, id]);
  }).catch((err) => Promise.reject(new Error(err)));
};

const remove = (id) => {
  find(id).then(() => {
    const sql = 'DELETE FROM organization WHERE id = ?';
    return connection.promise.query(sql, [id]);
  }).catch((err) => Promise.reject(new Error(err)));
};

module.exports = {
  findAll,
  find,
  findByName,
  create,
  modify,
  modifyAll,
  remove,
};
