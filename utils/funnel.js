/**
 * utils function to build the Funnel json content object from databases rows.
 * @rows list of rows (resultset)
 */
const buildFunnelJSON = (rows) => {
  const funnel = {
    themes: [],
  };

  let currFunnelTheme = null;
  let currFunnelQuestion = null;
  let currFunnelAnswer = null;
  rows.forEach((row) => {
    if (!funnel.themes.find((theme) => theme.id === row.theme_id)) {
      funnel.themes.push({
        id: row.theme_id,
        title: row.theme_title,
        icon: `/assets/theme-${row.theme_id}.png`,
      });
    }
    currFunnelTheme = funnel.themes.find((theme) => theme.id === row.theme_id);

    if (!('questions' in currFunnelTheme)) {
      currFunnelTheme.questions = [];
    }
    if (!currFunnelTheme.questions.find((question) => question.id === row.question_id)) {
      currFunnelTheme.questions.push({
        id: row.question_id,
        title: row.question_title,
        id_theme: row.id_theme,
      });
    }
    currFunnelQuestion = currFunnelTheme.questions
      .find((question) => question.id === row.question_id);

    if (!('answers' in currFunnelQuestion)) {
      currFunnelQuestion.answers = [];
    }
    if (!currFunnelQuestion.answers.find((answer) => answer.id === row.answer_id)) {
      currFunnelQuestion.answers.push({
        id: row.answer_id,
        label: row.answer_title,
        weight: row.weight,
        answ_type: row.type,
        id_question: row.id_question,
      });
    }

    currFunnelAnswer = currFunnelQuestion.answers
      .find((answer) => answer.id === row.answer_id);

    if (!('shouldList' in currFunnelAnswer)) {
      currFunnelAnswer.shouldList = [];
    }
    if (!currFunnelAnswer.shouldList.find((should) => should.id === row.reco_id)) {
      currFunnelAnswer.shouldList.push({
        id: row.reco_id,
        title: row.reco_title,
        content: row.reco_content,
        url: row.reco_url,
        trigger_value: row.trigger_value,
        trigger_max: row.trigger_max,
        id_answer: row.id_answer,
      });
    }
  });
  return funnel;
};

module.exports = {
  buildFunnelJSON,
};
