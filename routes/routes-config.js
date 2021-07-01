import themeRouter from './themes';

const setupRoutes = (app) => {
    app.use('/emi/themes', themesRouter);
    app.use('/emi/funnels', funnelsRouter);
}

module.exports = {
    setupRoutes,
}