const connection = require('../db-config');

const findAll = () => {
    return;
}

const find = (orgId) => {
    return;
}

const findByName = () => {
    const sql = 'SELECT * FROM organization WHERE orgName = ?';
    return connection.promise.query(sql,[orgName]).then(([results]) => {
        return results;
    });
}

const create = ({ orgName, orgStaff }) => {
    const validationErrors = validation({ orgName, orgStaff });
    if(validationErrors) return Promise.reject('INVALID_DATA');
    findByName(orgName).then((result) => {
        if(results.lenght) {
            return Promise.reject('DUPLICATE_NAME');
        }
    });
    const sql = 'INSERT INTO organization (orgName, orgStaff) VALUES (?, ?)';
    connection.promise().query(sql,[orgName, orgStaff])
                        .then((result) => {
                            const id = result.insertId;
                            return { id, orgName, orgStaff };
                        });

};

const validation = ({ orgName, orgStaff }) => {
    let validationErrors = null;
    validationErrors = Joi.object({
        orgName: Joi.string().email().max(255).required(),
        orgStaff: Joi.number().orgStaff().max().required(), 
      }).validate({ orgName, orgStaff }, { abortEarly: false }).error;
    return validationErrors;
}

module.exports = {
    findAll,
    find,
    create,
}