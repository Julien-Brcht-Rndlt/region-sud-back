import themeRouter from './themes';

const setupRoutes = (app) => {
    // add routes
    // app.use()

    app.use('/emi/themes', themeRouter);
}

module.exports = {
    setupRoutes,
}