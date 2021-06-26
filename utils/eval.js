/**
 * utils function to build the Eval Scores json object from databases rows.
 * @rows list of rows (resultset)
 */
const buildEvalScoresEvent = (rows) => {
    const evalScores = {
        event_id: rows[0].id,
        event_title: rows[0].title,
        themes: []
    };
    rows.forEach(row => {
        evalScores.themes[row.theme_id] = {
            theme_id: row.theme_id,
            score: row.score,
        }
    });
    return evalScores;
};

/**
 * utils function to build the Eval Anwers json content object from databases rows.
 * @rows list of rows (resultset)
 */
const buildEvalAnswersEvent = (rows) => {

}

const evalScoresUtils = {
    buildEvalScoresEvent,
    buildEvalAnswersEvent
};

module.exports = evalScoresUtils;