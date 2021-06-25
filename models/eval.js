const connection = require('db-config');

const findEventScores = (id) => {
    const sql = `SELECT FROM * FROM is_evaluated
                JOIN theme ON is_evaluated.id_theme = theme.id
                WHERE is_evaluated.id_event = ?
                ORDER BY theme.id`;

    return connection.promise().query(sql, [id]).then(([results]) => results);
}

module.exports = {
    findEventScores()
}