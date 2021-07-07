const connection = require('../db-config');

const find = () => {
  const sql = `SELECT theme.id as theme_id, theme.title as theme_title, theme.icon as theme_icon, 
  question.id as question_id, question.title as question_title, id_theme,
  answer.id as answ_id, answer.title as answ_title, answer.weight as answ_weight, answer.id_question as answ_id_question, answer.id_answer_type, answer.id_answer_type as answ_id_answer_type,
  answer_type.id as type_id, answer_type.title as type,
  related_to.id_answer as rel_to_id_answer,  related_to.id_recommandation as rel_to_id_recommandation, trigger_value, trigger_max,
  recommandation.id as reco_id, recommandation.title as reco_title, recommandation.content as reco_content, recommandation.url as reco_url
  FROM theme
  JOIN question ON theme.id = question.id_theme
  JOIN answer ON question.id = answer.id_question 
  JOIN answer_type ON answer.id_answer_type = answer_type.id
  LEFT JOIN related_to ON answer.id = related_to.id_answer
  JOIN recommandation ON related_to.id_recommandation = recommandation.id
  ORDER BY theme.id, question.id, answer.id;
                `;

  return connection.promise().query(sql);
};

module.exports = {
  find,
};
