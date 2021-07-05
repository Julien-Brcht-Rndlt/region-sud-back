const Joi = require('joi');
const connection = require('../db-config');

const validate = ({ title, reference, icon }, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    title: Joi.string().max(150).presence(presence),
    icon: Joi.string().max(50),
  }).validate({ title, reference, icon }, { abortEarly: false }).error;
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
    .then(([results]) => results[0]);
};

const create = ({ title, icon }) => {
  const sql = 'INSERT INTO themes (title, icon) VALUES (?, ?)';
  return connection
    .promise()
    .query(sql, [title, icon])
    .then(([{ insertId }]) => ({
      id: insertId,
      title,
      icon,
    }));
};

module.exports = {
  findAll,
  find,
  create,
  validate,
};
