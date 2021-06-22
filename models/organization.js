const connection = require('../db-config');

const findAll = () => {
    const sql = 'SELECT * FROM organization';
    return connection.promise().query(sql)
                .then(([results]) => results);
}

const find = (id) => {
    const sql = 'SELECT * FROM organization WHERE id = ?';
    connection.promise().query(sql, [id])
                .then(([results]) => {
                    if(!results.length){
                        return Promise.reject('RESOURCE_NOT_FOUND');
                    } else {
                        return results[0];
                    }
                });
}

const findByName = () => {
    const sql = 'SELECT * FROM organization WHERE orgName = ?';
    return connection.promise.query(sql,[orgName]).then(([results]) => {
        return results;
    });
}

const create = ({ orgName, orgStaff }) => {
    const validationErrors = validation({ orgName, orgStaff });
    if(validationErrors){
        return Promise.reject('INVALID_DATA');
    }
    findByName(orgName).then((result) => {
        if(results.lenght) {
            return Promise.reject('DUPLICATE_NAME');
        }
    });
    const sql = 'INSERT INTO organization (orgName, orgStaff) VALUES (?, ?)';
    connection.promise().query(sql,[orgName, orgStaff])
                        .then(([{insertId}]) => { insertId, orgName, orgStaff });

};

// patch
const modify = (id, {orgName, orgStaff}) => {
    const validationErrors = validation({orgName, orgStaff});
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((organization) => {
         // refactor code twice here + in create method.
         let sql = 'SELECT * FROM organization WHERE orgName = ?';
         connection.promise().query(sql, [prgName]).then(([results]) => {
         if(results.length){
             if(results.filter((result) => result.orgName === orgName)){
                 return Promise.reject('ORG_NAME_DUPLICATE');
             }
         }
 
         sql = 'UPDATE organization SET ? WHERE id = ?';
         const valuesToUpdate = {};
         orgName && (valuesToUpdate['orgName'] = orgName);
         orgStaff && (valuesToUpdate['orgStaff'] = orgStaff);
         return connection.promise.query(sql, [{ ...admin, ...valuesToUpdate }, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
    });
};

// put 
const modifyAll = (id, {orgName, orgStaff}) => {
    const validationErrors = validation({orgName, orgStaff});
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((organization) => {
         // refactor code three times here + in create method + modify.
         let sql = 'SELECT * FROM organization WHERE orgName = ?';
         connection.promise().query(sql, [orgName]).then(([results]) => {
         if(results.length){
             if(results.filter((result) => result.orgName === orgName)){
                 return Promise.reject('ORG_NAME_DUPLICATE');
             }
         }
 
         sql = 'UPDATE admin SET ? WHERE id = ?';
         return connection.promise.query(sql, [{orgName, orgStaff}, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
    });
};


const remove = (id) => {
    find(id).then((organization) => {
        const sql = 'DELETE FROM organization WHERE id = ?';
         return connection.promise.query(sql, [id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
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

/* const validation = ({ orgName, orgStaff }) => {
    let validationErrors = null;
    validationProps = {};
    orgName && (validationProps['orgName'] = Joi.string().max(150).required());
    orgStaff && (validationProps['orgStaff'] = Joi.number());
    validationErrors = Joi.object(validationProps)
            .validate({ orgName, orgStaff }, { abortEarly: false })
            .error;
    return validationErrors;
} */

module.exports = {
    findAll,
    find,
    create,
    modify,
    modifyAll,
    remove,
}