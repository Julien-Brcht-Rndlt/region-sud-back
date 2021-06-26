/**
 * utils function to build the Eval Scores json object from databases rows.
 * @rows list of rows (resultset)
 */
const buildEvalScoresEvent = (rows) => {
    const evalScores = {
        themes: [],
    };

    rows.forEach(row => {
        evalScores.themes[`${row.theme_id}`] = {
            id: row.theme_id,
            title: row.theme_title,
            icon: `/assets/theme-${row.theme_id}.png`,
            score: row.score,
        };
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