/**
 * utils function to build the Eval Anwers json content object from databases rows.
 * @rows list of rows (resultset)
 */
 const buildEvalAnswersEvent = (rows) => {
    const evalAnswers = {};
    evalAnswers.themes = [];

    let currEvalTheme = null;
    let currEvalQuestion = null;
    let currEvalAnswer = null;

    rows.forEach((row) => {
        if(!`${row.theme_id}` in evalAnswers.themes){
            evalAnswers.themes[`${row.theme_id}`] = {
                id: row.theme_id,
                title: row.theme_title,
                icon: `/assets/theme-${row.theme_id}.png`,
            };
        }
        currEvalTheme = evalAnswers.themes[`${row.theme_id}`];

        if(!'questions' in currEvalTheme){
            currEvalTheme.questions = [];
        }
        if(!`${row.question_id}` in currEvalTheme.questions){
            currEvalTheme.questions[`${row.question_id}`] = {
                id: row.question_id,
                title: row.question_title,
            };
        }
        currEvalQuestion = currEvalTheme.questions[`${row.question_id}`];
        
        if(!'answers' in currEvalQuestion){
            currEvalQuestion.answers = [];
        }
        if(!`${row.answer_id}` in currEvalTheme.answers){
            currEvalQuestion.answers[`${row.answer_id}`] = {
                id: row.answer_id,
                label: row.answer_title,
                eval_answer: row.answer_value,
            };
        }
        currEvalAnswer = currEvalQuestion.answers[`${row.answer_id}`];

        if(!'should' in currEvalAnswer){
            currEvalAnswer.should = [];
        }
        currEvalAnswer.should[`${row.recommandation.id}`] = {
            id: recommandation.id,
            label: row.recommandation_label,
            content: row.recommandation_content,
            trigger_value: row.trigger_value,
            trigger_max: row.trigger_max,
        }
    });
    return evalAnswers;
}

const evalScoresUtils = {
    buildEvalScoresEvent,
    buildEvalAnswersEvent
};

module.exports = evalScoresUtils;