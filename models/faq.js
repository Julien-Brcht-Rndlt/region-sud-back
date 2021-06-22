const connection = require('../db-config');
const Joi = require('joi');

const findAll = () => {
  const sql = 'SELECT * FROM faq';
    return connection.promise().query(sql)
                    .then(([results]) => results);  
}


const find = (id) => {
  const sql = 'SELECT * FROM faq WHERE id = ?';
    connection.promise().query(sql, [id])
                .then(([result]) => {
                    if(!results.length) {
                        return Promise.reject('RESSOURCE_NOT_FOUND');
                    } else {
                        return results;
                    }
                });
};

const create = ({ questionFaq , answerFaq  }) => {
    const validationErrors = validation({ questionFaq, answerFaq });
    if(validationErrors){
        return Promise.reject('THE_QUESTION_ALREADY_EXISTS');
    };
    const sql = 'INSERT INTO faq (questionFaq, answerFaq) VALUE (?, ?)';
    connection.promise().query(sql, [questionFaq, answerFaq])
                        .then(([{insertId}]) => { insertId, questionFaq, answerFaq });
};

const modify = (id, {questionFaq, answerFaq}) => {
    const validationErrors = validation({questionFaq, answerFaq});
    if(validationErrors) {
        return Promise.reject('CANT_CHANGE');
    } find(id).then((faq) => {
        let sql = 'SELECT * FROM faq WHERE questionFaq = ?';
        connection.promise().query(sql, [questionFaq]).then(([results]) => {
            if(results.lenght) {
                if(results.filter((result) => result.questionFaq === questionFaq)) {
                    return Promise.reject('QUESTION_DUPLICATE');
                }
            }
            sql = 'UPDATE faq SET ? WHERE id = ?';
            return connection.promise.query(sql, [{questionFaq, answerFaq}, id]);
            }).catch((err) => {
                if(err === 'RESOURCE_NOT_FOUND'){
                    return Promise.reject(err);
                }
            });
           }); 
};

const remove = (id) => {
    find(id).then((faq) => {
        const sql = 'DELETE FROM faq WHERE id = ?';
        return connection.promise.query(sql, [id]);
    }).catch((err) => {
        if(err === 'RESSOURCE_NOT_FOUND'){
            return Promise.reject(err);
        }
    });
};

const validation = ({ questionFaq, answerFaq }) => {
    let validationErrors = null;
    questionFaq && (validationProps['questionFaq'] = Joi.string().max().required());
    answerFaq && (validationProps['answerFaq'] = Joi.string().max().required());
    validationErrors = Joi.object(validationProps)
                            .validate({ questionFaq, answerFaq }, { abortEarly: false })
                            .error;
            return validationErrors;
}

module.exports = {
  findAll,
  find,
  create,
  modify,
  remove,
};
