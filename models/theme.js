const Joi = require('joi');
const connection = require('../db-config');

const validation = ({ title, reference, icon }) => {
  const validationErrors = Joi.object({
    title: Joi.string().max(150).required(),
    icon: Joi.string().max(50).required(),
  }).validate({ title, reference, icon }, { abortEarly: false }).error;
  return validationErrors;
};

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
        return Promise.reject(new Error('RESOURCE_NOT_FOUND'));
      }
      return results[0];
    });
};

const create = ({ title, icon }) => {
  const validationErrors = validation({ title, icon });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  const sql = 'INSERT INTO themes (title, reference, icon) VALUES (?, ?, ?)';
  return connection
    .promise()
    .query(sql, [title, icon])
    .then(([result]) => result);
};

module.exports = {
  findAll,
  find,
  create,
};
