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
    .then(([results]) => {
      console.log(results);
      console.log(results[0]);
      return results[0];
    });
};

const create = ({ username, email, password }) => {
  const sql = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?) ';
  return connection
    .promise()
    .query(sql, [username, email, password])
    .then((result) => {
      const adminId = result.insertId;
      return {
        id: adminId,
        username,
        email,
        password,
      };
    });
};

// patch
const modifyPatch = (id, { username, email, password }) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  const valuesToUpdate = {};
  if (username) {
    valuesToUpdate.username = username;
  }
  if (email) {
    valuesToUpdate.username = email;
  }
  if (password) {
    valuesToUpdate.username = password;
  }
  return connection.promise.query(sql, [valuesToUpdate, id]);
};

// put
const modify = (id, { username, email, password }) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  const valuesToUpdate = { username, email, password };
  return connection.promise.query(sql, [valuesToUpdate, id]);
};

const remove = (id) => {
  const sql = 'DELETE FROM admin WHERE id = ?';
  return connection.promise.query(sql, [id]);
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
