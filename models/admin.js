const connection = require('../db-config');

const findAll = () => {
    const sql = 'SELECT * FROM admin';
    return connection.promise().query(sql)
                .then(([results]) => results);
};

const find = (id) => {
    const sql = 'SELECT * FROM admin WHERE id = ?';
    connection.promise().query(sql, [id])
                .then(([results]) => {
                    if(!results.length){
                        return Promise.reject('RESOURCE_NOT_FOUND');
                    } else {
                        return results[0];
                    }
                });
};

const create = ({username, email, password}) => {
    const validationErrors = validation({username, email, password});
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
    connection.promise().query(sql, [username, email]).then(([results]) => {
        if(results.length){
            if(results.filter((result) => result.username === username)){
                return Promise.reject('USERNAME_DUPLICATE');
            } else if(results.filter((result) => result.email === email)){
                return Promise.reject('EMAIL_DUPLICATE');
            }
        }
    });

    sql = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?) ';
    connection.promise().query(sql, [username, email, password])
            .then((result) => result);
};

// patch
const modify = (id, {username, email, password}) => {
    const validationErrors = validation({username, email, password});
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((admin) => {
         // refactor code twice here + in create method.
         let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
         connection.promise().query(sql, [username, email]).then(([results]) => {
         if(results.length){
             if(results.filter((result) => result.username === username)){
                 return Promise.reject('USERNAME_DUPLICATE');
             } else if(results.filter((result) => result.email === email)){
                 return Promise.reject('EMAIL_DUPLICATE');
             }
         }
 
         sql = 'UPDATE admin SET ? WHERE id = ?';
         const valuesToUpdate = {};
         username && (valuesToUpdate['username'] = username);
         email && (valuesToUpdate['email'] = email);
         password && (valuesToUpdate['password'] = password);
         return connection.promise.query(sql, [{ ...admin, ...valuesToUpdate }, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
    });
};

const modifyAll = (id, {username, email, password}) => {
    const validationErrors = validation({username, email, password});
    if(validationErrors) {
        return Promise.reject('INVALID_DATA');
    }
    find(id).then((admin) => {
         // refactor code three times here + in create method + modify.
         let sql = 'SELECT * FROM admin WHERE username = ? OR email = ?';
         connection.promise().query(sql, [username, email]).then(([results]) => {
         if(results.length){
             if(results.filter((result) => result.username === username)){
                 return Promise.reject('USERNAME_DUPLICATE');
             } else if(results.filter((result) => result.email === email)){
                 return Promise.reject('EMAIL_DUPLICATE');
             }
         }
 
         sql = 'UPDATE admin SET ? WHERE id = ?';
         return connection.promise.query(sql, [{username, email, password}, id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
    });
};

const remove = (id) => {
    find(id).then((admin) => {
        const sql = 'DELETE FROM admin WHERE id = ?';
         return connection.promise.query(sql, [id]);
         }).catch((err) => {
             if(err === 'RESOURCE_NOT_FOUND'){
                 return Promise.reject(err);
             }
         });
};

const validation = ({ username, email, password }) => {
    let validationErrors = null;
    validationProps = {};
    username && (validationProps['username'] = Joi.string().max(150).required());
    email && (validationProps['email'] = Joi.string().email().max(50).required());
    password && (validationProps['password'] = Joi.string().max(25).required());
    validationErrors = Joi.object(validationProps)
                .validate({ username, email, password }, { abortEarly: false })
                .error;
    return validationErrors;
}

module.exports = {
    findAll,
    find,
    create,
    modify,
    modifyAll,
    remove,
};