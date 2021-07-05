const Joi = require('joi');
const connection = require('../db-config');

const validate = ({
  title,
  address,
  loc,
  staff,
  startDate,
  endDate,
  activity,
  level,
}, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    title: Joi.string().max(150).presence(presence),
    address: Joi.string().presence(presence),
    loc: Joi.string().presence(presence),
    staff: Joi.number(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    activity: Joi.string(),
    level: Joi.string(),
  }).validate({
    title, address, loc, staff, startDate, endDate, activity, level,
  }, { abortEarly: false }).error;
};

const findAll = () => {
  const sql = 'SELECT * FROM event';
  return connection.promise().query(sql).then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM event WHERE id = ?';
  return connection.promise().query(sql, [id]).then((results) => results[0]);
};

const findAllByOrg = (orgId) => {
  const sql = 'SELECT * FROM event WHERE id_organization = ?';
  return connection
    .promise()
    .query(sql, [orgId])
    .then(([results]) => results);
};

const findByTitle = (title) => {
  const sql = 'SELECT * FROM event WHERE title = ?';
  return connection.promise.query(sql,
    [title]).then(([results]) => results);
};

// create event for an organization

const create = ({
  title,
  address,
  loc,
  staff,
  startDate,
  endDate,
  activity,
  level,
  orgId,
}) => {
  const sql = 'INSERT INTO event (title, address, loc, staff, startDate, endDate, activity, level, id_organization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return connection.promise().query(
    sql,
    [title, address, loc, staff, startDate, endDate, activity, level, orgId],
  )
    .then(([{ insertId }]) => ({
      id: insertId,
      title,
      address,
      loc,
      staff,
      startDate,
      endDate,
      activity,
      level,
      orgId,
    }));
};

// patch
const modifyPatch = (id, valuesToUpdate) => {
  const sql = 'UPDATE event SET ? WHERE id = ?';
  return connection.promise.query(sql, [valuesToUpdate, id]);
};

// put
const modify = (id,
  {
    title,
    address,
    loc,
    staff,
    startDate,
    endDate,
    activity,
    level,
  }) => {
  const sql = 'UPDATE admin SET ? WHERE id = ?';
  return connection.promise.query(sql,
    [{
      title,
      address,
      loc,
      staff,
      startDate,
      endDate,
      activity,
      level,
    }, id]);
};

const remove = (id) => {
  const sql = 'DELETE FROM event WHERE id = ?';
  return connection.promise.query(sql, [id]);
};

module.exports = {
  findAll,
  find,
  findAllByOrg,
  findByTitle,
  create,
  modify,
  modifyPatch,
  remove,
  validate,
};
