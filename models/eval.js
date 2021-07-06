const connection = require('../db-config');

const findEventScores = (id) => {
  const sql = `SELECT FROM * FROM is_evaluated
                JOIN theme ON is_evaluated.id_theme = theme.id
                WHERE is_evaluated.id_event = ?
                ORDER BY theme.id`;

  return connection.promise().query(sql, [id]).then(([results]) => results);
};

const findEventAnswers = (id) => {
  const sql = `SELECT theme.id as theme_id, theme.title as theme_title, theme.icon as theme_icon, 
  question.id as question_id, question.title as question_title, id_theme,
  answer.id as answer_id, answer.title as answer_title, weight, id_question,
  related_to.id_answer as rel_to_id_answer,  related_to.id_recommandation as rel_to_id_recommandation, trigger_value, trigger_max,
  recommandation.id as reco_id, recommandation.title as reco_label, recommandation.content as reco_content, recommandation.url as reco_url 
  FROM event
  LEFT JOIN eval_answer ON event.id = eval_answer.id_event
  RIGHT JOIN answer ON eval_answer.id_answer = answer.id
  LEFT JOIN related_to ON answer.id = related_to.id_answer
  JOIN recommandation ON related_to.id_recommandation = recommandation.id
  JOIN question ON question.id = answer.id_question
  JOIN theme ON theme.id = question.id_theme
  ORDER BY theme.id, question.id, answer.id, recommandation.id;
  `;

  return connection.promise().query(sql, [id]).then(([results]) => results);
};

const createThemeScore = (eventId, themeId, score) => {
  const sql = 'INSERT INTO is_evaluated (id_event, id_theme, score) VALUES (?, ?, ?)';
  return connection.promise().query(sql, [eventId, themeId, score])
    .then(([result]) => {
      console.log(result);
      return { eventId, themeId, score };
    });
};

const createEvalAnswer = (eventId, answerId, evalValue) => {
  const sql = 'INSERT INTO eval_answer (id_event, id_answer, answer_value) VALUES (?, ?, ?)';
  return connection.promise().query(sql, [eventId, answerId, evalValue])
    .then(([result]) => {
      console.log(result);
      return { eventId, answerId, evalValue };
    });
};

module.exports = {
  findEventScores,
  findEventAnswers,
  createThemeScore,
  createEvalAnswer,
};
