const Joi = require('joi');
const connection = require('../db-config');

const validate = ({ question, answer }, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    question: Joi.string().presence(presence),
    answer: Joi.string().presence(presence),
  }).validate({ question, answer }, { abortEarly: false }).error;
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

const findByQuestion = (question) => {
  const sql = 'SELECT * FROM faq WHERE question = ?';
  return connection.promise().query(sql, [question])
    .then(([results]) => results);
};

const create = ({ question, answer }) => {
  const sql = 'INSERT INTO faq (question, answer) VALUE (?, ?)';
  return connection.promise().query(sql, [question, answer])
    .then(([{ insertId }]) => ({ insertId, question, answer }));
};

// patch
const modifyPatch = (id, valuesToUpdate) => {
  const sql = 'UPDATE faq SET ? WHERE id = ?';
  return connection.promise().query(sql, [valuesToUpdate, id]);
};

// put
const modify = (id, { question, answer }) => {
  const sql = 'UPDATE faq SET ? WHERE id = ?';
  console.log(sql);
  return connection.promise().query(sql,
    [{ question, answer }, id]).then((result) => {
    console.log(result);
    return result;
  });
};

const remove = (id) => {
  const sql = 'DELETE FROM faq WHERE id = ?';
  return connection.promise().query(sql, [id]).then((result) => result);
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
