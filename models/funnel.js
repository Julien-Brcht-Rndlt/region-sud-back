const connection = require('../db-config');

const find = () => {
  const sql = `SELECT * FROM theme 
                JOIN question ON theme.id = question.id_theme
                JOIN answer ON question.id = answer.id_question 
                JOIN answer_type ON answer.id_answer_type = answer_type.id
                JOIN related_to ON answer.id = related_to.id
                LEFT JOIN recommandation ON related_to.id_recommandation = recommandation.id
                ORDER BY theme.id, question.id, answer.id
                `;

  return connection.promise().query(sql);
};

module.exports = {
  find,
};
