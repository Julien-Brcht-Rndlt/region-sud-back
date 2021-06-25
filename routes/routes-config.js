const evalRouter = require('evals');

const setupRoutes = (app) => {
    // add routes
    // app.use()
    app.use('/evals/1', evalRouter);
}

module.exports = {
    setupRoutes,
}