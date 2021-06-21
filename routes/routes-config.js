const orgRouter = require('./organizations');
const faqRouter = require('./faq');

const setupRoutes = (app) => {
    // add routes
    app.use('/emi/organizations', orgRouter);
    app.use('emi/faq', faqRouter);
}

module.exports = {
    setupRoutes,
}