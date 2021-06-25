const connection = require('db-config');

const findEventScores = (id) => {
    const sql = `SELECT FROM * FROM is_evaluated
                JOIN theme ON is_evaluated.id_theme = theme.id
                WHERE is_evaluated.id_event = ?
                ORDER BY theme.id`;

    return connection.promise().query(sql, [id]).then(([results]) => results);
};

const findEventAnswers = (id) => {
    const sql = `SELECT FROM * FROM eval_answer
                JOIN answer ON eval_answer.id_answer = answer.id
                LEFT JOIN related_to ON answer.id = related_to.id
                RIGHT JOIN recommandation ON related_to.id_recommandation = recommandation.id
                JOIN question ON question.id = answer.id_question
                JOIN question ON theme.id = question.id_theme
                WHERE eval_answer..id_event = ?
                ORDER BY theme.id, question.id, answer.id
                ORDER BY theme.id`;

    return connection.promise().query(sql, [id]).then(([results]) => results);
}

module.exports = {
    findEventScores,
    findEventAnswers,
}