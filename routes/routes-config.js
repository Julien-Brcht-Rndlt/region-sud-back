const orgRouter = require('./organizations');
const eventRouter = require('./events');
const faqRouter = require('./faq');
const adminRouter = require('./admin');

const setupRoutes = (app) => {
    // add routes
    app.use('/emi/organizations', orgRouter);
    app.use('emi/events', eventRouter);
    app.use('emi/faq', faqRouter);
    app.use('emi/admin', adminRouter);
    app.use('/emi/themes', themesRouter);
    app.use('/emi/funnels', funnelsRouter);
}

module.exports = {
    setupRoutes,
}