import themeRouter from './themes';

const setupRoutes = (app) => {
    // add routes
    // app.use()

    app.use('/emi/themes', themesRouter);
    app.use('/emi/funnels', funnelsRouter);
}

module.exports = {
    setupRoutes,
}