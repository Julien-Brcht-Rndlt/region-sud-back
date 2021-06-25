const connection = require('db-config');

const findEventScores = (id) => {
    const sql = `SELECT FROM * FROM is_evaluated
                JOIN event ON is_evaluated.id = event.id
                JOIN theme ON is_evaluated.id_theme = theme.id
                WHERE event.id = ?
                ORDER BY theme.id`;

    return connection.promise().query(sql, [id]).then(([results]) => results);
}

module.exports = {
    findEventScores()
}