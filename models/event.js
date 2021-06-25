const connection = require('../db-config.js');
const Joi = require('joi');

const findAll = () => {
    const sql = 'SELECT * FROM event';
    return connection.promise().query(sql)
                .then(([results]) => results);
}

const find = (id) => {
    const sql = 'SELECT * FROM event WHERE id = ?';
    connection.promise().query(sql, [id])
                .then(([results]) => {
                    if(!results.length){
                        return Promise.reject('RESOURCE_NOT_FOUND');
                    } else {
                        return results[0];
                    }
                });
}

const findAllByOrg = (orgId) => {
    const sql = 'SELECT * FROM event WHERE id_organization = ?';
    return connection
    .promise()
    .query(sql, [orgId])
    .then(([results]) => results);
}

const findByTitle = (title) => {
    const sql = 'SELECT * FROM event WHERE title = ?';
    return connection.promise.query(sql,[title]).then(([results]) => {
        return results;
    });
};

// create event for an organization

const create = ({ title, address, loc, staff, startDate, endDate, activity, level, orgId }) => {
    const validationErrors = validation({ title, address, loc, staff, startDate, endDate, activity, level });
    if(validationErrors){
        return Promise.reject('INVALID_DATA');
    }
    const sql = 'INSERT INTO event (title, address, loc, staff, startDate, endDate, activity, level, id_organization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.promise().query(sql,[title, address, loc, staff, startDate, endDate, activity, level, orgId])
                        .then(([{insertId}]) => { insertId, title, address, loc, staff, startDate, endDate, activity, level, orgId });
};

// patch
const modify = (id, { title, address, loc, staff, startDate, endDate, activity, level }) => {
    const validationErrors = validation({ title, address, loc, staff, startDate, endDate, activity, level });
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((event) => {
         sql = 'UPDATE event SET ? WHERE id = ?';

         const valuesToUpdate = {};
         title && (valuesToUpdate['title'] = title);
         address && (valuesToUpdate['address'] = address);
         loc && (valuesToUpdate['loc'] = loc);
         staff && (valuesToUpdate['staff'] = staff);
         startDate && (valuesToUpdate['startDate'] = startDate);
         endDate && (valuesToUpdate['endDate'] = endDate);
         activity && (valuesToUpdate['activity'] = activity);
         level && (valuesToUpdate['level'] = level);

         return connection.promise.query(sql, [{ ...admin, ...valuesToUpdate }, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
};

// put 
const modifyAll = (id, { title, address, loc, staff, startDate, endDate, activity, level }) => {
    const validationErrors = validation({ title, address, loc, staff, startDate, endDate, activity, level });
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((event) => {
         sql = 'UPDATE admin SET ? WHERE id = ?';
         return connection.promise.query(sql, [{ title, address, loc, staff, startDate, endDate, activity, level }, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
};


const remove = (id) => {
    find(id).then((event) => {
        const sql = 'DELETE FROM event WHERE id = ?';
         return connection.promise.query(sql, [id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
};

const validation = ({ title, address, loc, staff, startDate, endDate, activity, level }) => {
    let validationErrors = null;
    validationErrors = Joi.object({
        title: Joi.string().max(150).required(),
        address: Joi.string().required(),
        loc: Joi.string().required(),
        staff: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        activity: Joi.string(),
        level: Joi.string(), 
      }).validate({ title, address, loc, staff, startDate, endDate, activity, level }, { abortEarly: false }).error;
    return validationErrors;
}

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