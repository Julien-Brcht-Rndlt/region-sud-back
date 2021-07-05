const Joi = require('joi');
const connection = require('../db-config');

const validate = ({ questionFaq, answerFaq }, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    questionFaq: Joi.string().max().presence(presence),
    answerFaq: Joi.string().max().presence(presence),
  }).validate({ questionFaq, answerFaq }, { abortEarly: false }).error;
};

const findAll = () => {
  const sql = 'SELECT * FROM faq';
  return connection.promise().query(sql)
    .then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM faq WHERE id = ?';
  return connection.promise().query(sql, [id])
    .then(([results]) => results[0]);
};

const findByQuestion = (label) => {
  const sql = 'SELECT * FROM faq WHERE question = ?';
  return connection.promise().query(sql, [label])
    .then(([results]) => results);
};

const create = ({ questionFaq, answerFaq }) => {
  const sql = 'INSERT INTO faq (questionFaq, answerFaq, u) VALUE (?, ?)';
  return connection.promise().query(sql, [questionFaq, answerFaq])
    .then(([{ insertId }]) => ({ insertId, questionFaq, answerFaq }));
};

/* const modify = (id, { questionFaq, answerFaq }) => {
  const validationErrors = validation({ questionFaq, answerFaq });
  if (validationErrors) {
    return Promise.reject(new Error('CANT_CHANGE'));
  }
  return find(id).then(() => {
    let sql = 'SELECT * FROM faq WHERE questionFaq = ?';
    connection.promise().query(sql, [questionFaq]).then(([results]) => {
      if (results.lenght) {
        if (results.filter((result) => result.questionFaq === questionFaq)) {
          return Promise.reject(new Error('QUESTION_DUPLICATE'));
        }
      }
      sql = 'UPDATE faq SET ? WHERE id = ?';
      return connection.promise.query(sql, [{ questionFaq, answerFaq }, id]);
    }).catch((err) => Promise.reject(err));
  });
}; */

const remove = (id) => find(id).then(() => {
  const sql = 'DELETE FROM faq WHERE id = ?';
  return connection.promise.query(sql, [id]);
}).catch((err) => Promise.reject(err));

module.exports = {
  findAll,
  find,
  findByQuestion,
  create,
  /* modify, */
  remove,
  validate,
};
