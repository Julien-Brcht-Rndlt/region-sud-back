const connection = require('../db-config');
const Joi = require('joi');

const findAll = () => {
    const sql = 'SELECT * FROM theme';
    return connection.promise().query(sql)
                .then(([results]) => results);
};

const findId = (id) => {
    const sql = "SELECT * from themes WHERE id = ?";
    return connection.promise().query(sql, [id])
                .then(([results]) => {
                if (!results){
                    return Promise.reject('RESOURCE_NOT_FOUND');
                } else {
                    return results[0];
                }
                })
};

const create = ({title, reference, icon}) => {
    const sql = 'INSERT INTO themes (title, reference, icon) VALUES (?, ?,? )';
    connection.promise().query(sql, [title, reference, icon]).then(([result]) => result);
};


const validation = ({title, reference, icon}) => {
    let validationErrors = null;
    validationProps = {};
    title && (validationProps['title'] = Joi.string().max(150).required());
    reference && (validationProps['reference'] = Joi.string().max(25).required());
  icon && (validationProps['icon'] = Joi.string().max(50).required());
    validationErrors = Joi.object(validationProps)
                        .validate({title, reference, icon},{ abortEarly: false })
                        .error;
            return validationErrors;
} 


module.exports = {
    findAll,
    findId,
    create,
};