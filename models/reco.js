const connection = require('../db-config');

const findAll = () => {
  const sql = 'SELECT * FROM recommandation';
  return connection.promise().query(sql).then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM recommandation WHERE id = ?';
  return connection.promise().query(sql, [id]).then(([results]) => results[0]);
};

const findByTitle = (title) => {
  const sql = 'SELECT * FROM recommandation WHERE title = ?';
  return connection.promise().query(sql,
    [title]).then(([results]) => results);
};

const create = (reco) => {
  const sql = 'INSERT INTO recommandation SET ?';
  return connection.promise().query(sql, [reco])
    .then(([{ insertId }]) => ({ id: insertId, ...reco }));
};

const modify = (id, reco, valuesToUpdate) => {
  const sql = 'UPDATE recommandation SET ? WHERE id = ?';
  return connection.promise().query(sql, [valuesToUpdate, id])
    .then((result) => {
      console.log(result);
      return { id, ...reco, ...valuesToUpdate };
    });
};

const remove = (id) => {
  const sql = 'DELETE FROM recommandation WHERE id = ?';
  return connection.promise().query(sql, [id])
    .then((results) => results[0]);
};

module.exports = {
  findAll,
  find,
  findByTitle,
  create,
  modify,
  remove,
};
