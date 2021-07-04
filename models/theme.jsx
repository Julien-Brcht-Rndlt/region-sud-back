const connection = require('../db-config');
const Joi = require('joi');

const findAll = () => {
  const sql = 'SELECT * FROM theme';
  return connection
    .promise()
    .query(sql)
    .then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * from themes WHERE id = ?';
  return connection
    .promise()
    .query(sql, [id])
    .then(([results]) => {
      if (!results) {
        return Promise.reject('RESOURCE_NOT_FOUND');
      } else {
        return results[0];
      }
    });
};

const validation = ({ title, reference, icon }) => {
  let validationErrors = null;
  validationErrors = Joi.object({
    title: Joi.string().max(150).required(),
    reference: Joi.string().max(25).required(),
    icon: Joi.string().max(50).required(),
  }).validate({ title, reference, icon }, { abortEarly: false }).error;
  return validationErrors;
};

const create = ({ title, reference, icon }) => {
  const sql = 'INSERT INTO themes (title, reference, icon) VALUES (?, ?, ?)';
  return connection
    .promise()
    .query(sql, [title, reference, icon])
    .then(([result]) => result);
};

module.exports = {
  findAll,
  find,
  create,
};
