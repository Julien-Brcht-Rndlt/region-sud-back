const Joi = require('joi');
const connection = require('../db-config');

const validation = ({
  title,
  address,
  loc,
  staff,
  startDate,
  endDate,
  activity,
  level,
}) => {
  const validationErrors = Joi.object({
    title: Joi.string().max(150).required(),
    address: Joi.string().required(),
    loc: Joi.string().required(),
    staff: Joi.number(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    activity: Joi.string(),
    level: Joi.string(),
  }).validate({
    title, address, loc, staff, startDate, endDate, activity, level,
  }, { abortEarly: false }).error;
  return validationErrors;
};

const findAll = () => {
  const sql = 'SELECT * FROM event';
  return connection.promise().query(sql).then(([results]) => results);
};

const find = (id) => {
  const sql = 'SELECT * FROM event WHERE id = ?';
  connection.promise().query(sql, [id]).then(([results, err]) => {
    if (!results.length || err) {
      return Promise.reject(new Error('RESOURCE_NOT_FOUND'));
    }
    return results[0];
  });
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
  const validationErrors = validation({
    title,
    address,
    loc,
    staff,
    startDate,
    endDate,
    activity,
    level,
  });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  const sql = 'INSERT INTO event (title, address, loc, staff, startDate, endDate, activity, level, id_organization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return connection.promise().query(
    sql,
    [title, address, loc, staff, startDate, endDate, activity, level, orgId],
  )
    .then(([{ insertId }]) => ({
      insertId,
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
const modify = (id, {
  title,
  address,
  loc,
  staff,
  startDate,
  endDate,
  activity,
  level,
}) => {
  const validationErrors = validation({
    title, address, loc, staff, startDate, endDate, activity, level,
  });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then(() => {
    const sql = 'UPDATE event SET ? WHERE id = ?';

    const valuesToUpdate = {
      title,
      address,
      loc,
      staff,
      startDate,
      endDate,
      activity,
      level,
    };

    return connection.promise.query(sql, [{
      title, address, loc, staff, startDate, endDate, activity, level, ...valuesToUpdate,
    }, id]);
  }).catch((err) => Promise.reject(new Error(err)));
};

// put
const modifyAll = (id,
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
  const validationErrors = validation({
    title,
    address,
    loc,
    staff,
    startDate,
    endDate,
    activity,
    level,
  });
  if (validationErrors) {
    return Promise.reject(new Error('INVALID_DATA'));
  }
  return find(id).then(() => {
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
  })
    .catch((err) => Promise.reject(new Error(err)));
};

const remove = (id) => {
  find(id).then(() => {
    const sql = 'DELETE FROM event WHERE id = ?';
    return connection.promise.query(sql, [id]);
  }).catch((err) => {
    if (err === 'RESOURCE_NOT_FOUND') {
      return Promise.reject(new Error(err));
    }
    return Promise.reject(err);
  });
};

module.exports = {
  findAll,
  find,
  findAllByOrg,
  findByTitle,
  create,
  modify,
  modifyAll,
  remove,
};
