const Joi = require('joi');
const connection = require('../db-config');
const constants = require('../constants');

const validation = ({ questionFaq, answerFaq }) => {
  const validationErrors = Joi.object({
    questionFaq: Joi.string().max().required(),
    answerFaq: Joi.string().max().required(),
  }).validate({ questionFaq, answerFaq }, { abortEarly: false }).error;
  return validationErrors;
};

const findAll = () => {
  const sql = 'SELECT * FROM faq';
  return connection.promise().query(sql)
    .then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM faq WHERE id = ?';
  return connection.promise().query(sql, [id])
    .then(([results]) => {
      if (!results.length) {
        return Promise.reject(new Error('RESSOURCE_NOT_FOUND'));
      }
      return results;
    });
};

const create = ({ questionFaq, answerFaq }) => {
  const validationErrors = validation({ questionFaq, answerFaq });
  if (validationErrors) {
    return Promise.reject(constants.RESOURCE_DUPLICATE);
  }
  const sql = 'INSERT INTO faq (questionFaq, answerFaq) VALUE (?, ?)';
  return connection.promise().query(sql, [questionFaq, answerFaq])
    .then(([{ insertId }]) => ({ insertId, questionFaq, answerFaq }));
};

const modify = (id, { questionFaq, answerFaq }) => {
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
};

const remove = (id) => find(id).then(() => {
  const sql = 'DELETE FROM faq WHERE id = ?';
  return connection.promise.query(sql, [id]);
}).catch((err) => Promise.reject(err));

module.exports = {
  findAll,
  find,
  create,
  modify,
  remove,
};
