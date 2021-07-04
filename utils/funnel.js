/**
 * utils function to build the Funnel json content object from databases rows.
 * @rows list of rows (resultset)
 */
 const buildFunnelJSON = (rows) => {
    const funnel = {
        themes = [],
    };

    let currFunnelTheme = null;
    let currFunnelQuestion = null;
    let currFunnelAnswer = null;

    rows.forEach((row) => {
        
        if(!`${row.theme_id}` in funnel.themes){
            funnel.themes[`${row.theme_id}`] = {
                id: row.theme_id,
                title: row.theme_title,
                icon: `/assets/theme-${row.theme_id}.png`,
            };
        }
        currFunnelTheme = funnel.themes[`${row.theme_id}`];

        if(!'questions' in currFunnelTheme){
            currFunnelTheme.questions = [];
        }
        if(!`${row.question_id}` in currFunnelTheme.questions){
            currFunnelTheme.questions[`${row.question_id}`] = {
                id: row.question_id,
                title: row.question_title,
            };
        }
        currFunnelQuestion = currFunnelTheme.questions[`${row.question_id}`];

        if(!'answers' in currFunnelQuestion){
            currFunnelQuestion.answers = [];
        }
        if(!`${row.answer_id}` in currFunnelTheme.answers){
            currFunnelQuestion.answers[`${row.answer_id}`] = {
                id: row.answer_id,
                label: row.answer_title,
                weight: row.weight,
                answ_type: row.answer_type,
            };
        }
        currFunnelAnswer = currFunnelQuestion.answers[`${row.answer_id}`];

        if(!'should' in currFunnelAnswer){
            currFunnelAnswer.should = [];
        }
        currFunnelAnswer.should[`${row.recommandation.id}`] = {
            id: recommandation.id,
            label: row.recommandation_label,
            content: row.recommandation_content,
            trigger_value: row.trigger_value,
            trigger_max: row.trigger_max,
        }
    });
    return funnel;
 };

 module.exports = {
     buildFunnelJSON,
 }
