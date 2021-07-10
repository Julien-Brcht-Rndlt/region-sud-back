const Joi = require('joi');
const connection = require('../db-config');

const validate = ({ orgName, orgStaff }, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    orgName: Joi.string().max(150).presence(presence),
    orgStaff: Joi.number(),
  }).validate({ orgName, orgStaff }, { abortEarly: false }).error;
};

const findAll = () => {
  const sql = 'SELECT * FROM organization';
  return connection.promise().query(sql).then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM organization WHERE id = ?';
  return connection.promise().query(sql, [id]).then(([results]) => results[0]);
};

const findByName = (orgName) => {
  const sql = 'SELECT * FROM organization WHERE orgName = ?';
  return connection.promise()
    .query(sql,
      [orgName]).then(([results]) => results);
};

const create = (orgName, orgStaff) => {
  const sql = 'INSERT INTO organization (orgName, orgStaff) VALUES (?, ?)';
  return connection.promise()
    .query(sql,
      [orgName, orgStaff]).then(([{ insertId }]) => ({ id: insertId, orgName, orgStaff }));
};

// patch
const modifyPatch = (id, valuesToUpdate) => {
  const sql = 'UPDATE organization SET ? WHERE id = ?';
  return connection.promise().query(sql, [valuesToUpdate, id]).then(([result]) => result);
};

// put
const modify = (id, { orgName, orgStaff }) => {
  const sql = 'UPDATE organization SET ? WHERE id = ?';
  return connection.promise().query(sql, [{ orgName, orgStaff }, id]).then(([result]) => result);
};

const remove = (id) => {
  const sql = 'DELETE FROM organization WHERE id = ?';
  return connection.promise().query(sql, [id]).then(([result]) => result);
};

module.exports = {
  findAll,
  find,
  findByName,
  create,
  modifyPatch,
  modify,
  remove,
  validate,
};
