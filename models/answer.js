const connection = require('../db-config');

const find = (id) => {
  const sql = 'SELECT * FROM answer WHERE id = ?';
  return connection.promise().query(sql, [id])
    .then(([results]) => results[0]);
};

module.exports = {
  find,
};
