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

// patch
const modifyPatch = (id, valuesToUpdate) => {
  const sql = 'UPDATE faq SET ? WHERE id = ?';
  return connection.promise.query(sql, [valuesToUpdate, id]);
};

// put
const modify = (id, { questionFaq, answerFaq }) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  return connection.promise.query(sql,
    [{ questionFaq, answerFaq }, id]);
};

const remove = (id) => {
  const sql = 'DELETE FROM faq WHERE id = ?';
  return connection.promise.query(sql, [id]);
};

module.exports = {
  findAll,
  find,
  findByQuestion,
  create,
  modify,
  modifyPatch,
  remove,
  validate,
};
