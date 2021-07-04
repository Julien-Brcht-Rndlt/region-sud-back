const Joi = require('joi');
const connection = require('../db-config');

const validation = ({ username, email, password }) => {
  const validationErrors = Joi.object({
    username: Joi.string().max(150).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().max(25).required(),
  }).validate({ username, email, password }, { abortEarly: false }).error;
  return validationErrors;
};

const findAll = () => {
  const sql = 'SELECT * FROM admin';
  return connection
    .promise()
    .query(sql)
    .then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM admin WHERE id = ?';
  connection
    .promise()
    .query(sql, [id])
    .then(([results]) => {
      if (!results.length) {
        return Promise.reject(new Error('RESOURCE_NOT_FOUND'));
      }
      return results[0];
    });
};

const create = ({ username, email, password }) => {
  const validationErrors = validation({ username, email, password });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
  connection
    .promise()
    .query(sql, [username, email])
    .then(([results]) => {
      if (results.length) {
        if (results.filter((result) => result.username === username)) {
          return Promise.reject(new Error('USERNAME_DUPLICATE'));
        }
        if (results.filter((result) => result.email === email)) {
          return Promise.reject(new Error('EMAIL_DUPLICATE'));
        }
      }
      return results;
    });

  sql = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?) ';
  return connection
    .promise()
    .query(sql, [username, email, password])
    .then((result) => result);
};

// patch
const modify = (id, { username, email, password }) => {
  const validationErrors = validation({ username, email, password });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then((admin) => {
    // refactor code twice here + in create method.
    let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
    connection
      .promise()
      .query(sql, [username, email])
      .then(([results]) => {
        if (results.length) {
          if (results.filter((result) => result.username === username)) {
            return Promise.reject(new Error('USERNAME_DUPLICATE'));
          }
          if (results.filter((result) => result.email === email)) {
            return Promise.reject(new Error('EMAIL_DUPLICATE'));
          }
        }

        sql = 'UPDATE admin SET ? WHERE id = ?';
        const valuesToUpdate = { username, email, password };
        return connection.promise.query(sql, [
          { ...admin, ...valuesToUpdate },
          id,
        ]);
      })
      .catch((err) => Promise.reject(err));
  });
};

const modifyAll = (id, { username, email, password }) => {
  const validationErrors = validation({ username, email, password });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then(() => {
    // refactor code three times here + in create method + modify.
    let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
    connection
      .promise()
      .query(sql, [username, email])
      .then(([results]) => {
        if (results.length) {
          if (results.filter((result) => result.username === username)) {
            return Promise.reject(new Error('USERNAME_DUPLICATE'));
          }
          if (results.filter((result) => result.email === email)) {
            return Promise.reject(new Error('EMAIL_DUPLICATE'));
          }
        }

        sql = 'UPDATE admin SET ? WHERE id = ?';
        return connection.promise.query(sql, [
          { username, email, password },
          id,
        ]);
      })
      .catch((err) => Promise.reject(err));
  });
};

const remove = (id) => {
  find(id)
    .then(() => {
      const sql = 'DELETE FROM admin WHERE id = ?';
      return connection.promise.query(sql, [id]);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = {
  findAll,
  find,
  create,
  modify,
  modifyAll,
  remove,
};
