const Joi = require('joi');
const connection = require('../db-config');

const validate = ({ username, email, password }, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    username: Joi.string().max(150).presence(presence),
    email: Joi.string().email().max(50).presence(presence),
    password: Joi.string().max(25).presence(presence),
  }).validate({ username, email, password }, { abortEarly: false }).error;
};

const findAll = () => {
  const sql = 'SELECT * FROM admin';
  return connection
    .promise()
    .query(sql)
    .then(([results]) => results);
};

const findMany = ({ username, email }) => {
  const sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
  return connection
    .promise()
    .query(sql, [username, email])
    .then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM admin WHERE id = ?';
  return connection
    .promise()
    .query(sql, [id])
    .then(([results]) => results[0]);
};

const create = ({ username, email, password }) => {
  const sql = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?) ';
  return connection
    .promise()
    .query(sql, [username, email, password])
    .then(([result]) => {
      const adminId = result.insertId;
      return {
        id: adminId,
        username,
        email,
      /*    password, */
      };
    });
};

// patch
const modifyPatch = (id, valuesToUpdate) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  return connection.promise().query(sql, [valuesToUpdate, id]).then(([result]) => result);
};

// put
const modify = (id, { username, email, password }) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  const valuesToUpdate = { username, email, password };
  return connection.promise().query(sql, [valuesToUpdate, id]).then(([result]) => result);
};

const remove = (id) => {
  const sql = 'DELETE FROM admin WHERE id = ?';
  return connection.promise().query(sql, [id]).then((result) => result[0]);
};

module.exports = {
  findAll,
  findMany,
  find,
  create,
  modify,
  modifyPatch,
  remove,
  validate,
};
