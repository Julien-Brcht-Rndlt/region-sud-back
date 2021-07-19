/**
 * utils function to build the Eval Scores json object from databases rows.
 * @rows list of rows (resultset)
 */
const buildEvalScoresEventJSON = (rows) => {
  const evalScores = {
    themes: [],
  };
  rows.forEach((row) => {
    if (!evalScores.themes.find((theme) => theme.id === row.theme_id)) {
      evalScores.themes.push({
        id: row.theme_id,
        title: row.theme_title,
        icon: `/assets/theme-${row.theme_id}.png`,
        score: row.score,
      });
    }
  });
  return evalScores;
};

/**
 * utils function to build the Eval Anwers json content object from databases rows.
 * @rows list of rows (resultset)
 */
const buildEvalAnswersEventJSON = (rows) => {
  const evalAnswers = {};
  evalAnswers.themes = [];

  let currEvalTheme = null;
  let currEvalQuestion = null;
  let currEvalAnswer = null;

  rows.forEach((row) => {
    if (!evalAnswers.themes.find((theme) => theme.id === row.theme_id)) {
      evalAnswers.themes.push({
        id: row.theme_id,
        title: row.theme_title,
        icon: `/assets/theme-${row.theme_id}.png`,
      });
    }
    currEvalTheme = evalAnswers.themes.find((theme) => theme.id === row.theme_id);

    if (!('questions' in currEvalTheme)) {
      currEvalTheme.questions = [];
    }
    if (!currEvalTheme.questions.find((question) => question.id === row.question_id)) {
      currEvalTheme.questions.push({
        id: row.question_id,
        title: row.question_title,
        id_theme: row.id_theme,
      });
    }
    currEvalQuestion = currEvalTheme.questions.find((question) => question.id === row.question_id);

    if (!('givenAnswers' in currEvalQuestion)) {
      currEvalQuestion.answers = [];
    }
    if (!currEvalQuestion.answers.find((answer) => answer.id === row.answer_id)) {
      currEvalQuestion.answers.push({
        id: row.answer_id,
        label: row.answer_title,
        weight: row.weight,
        eval_value: row.answer_value,
        id_question: row.id_question,
      });
    }
    currEvalAnswer = currEvalQuestion.answers.find((answer) => answer.id === row.answer_id);

    if (!('should' in currEvalAnswer)) {
      currEvalAnswer.should = [];
    }
    currEvalAnswer.should.push({
      id: row.reco_id,
      label: row.reco_label,
      content: row.reco_content,
      url: row.reco_url,
      trigger_value: row.trigger_value,
      trigger_max: row.trigger_max,
    });
  });
  return evalAnswers;
};

const evalScoresUtils = {
  buildEvalScoresEventJSON,
  buildEvalAnswersEventJSON,
};

module.exports = evalScoresUtils;
