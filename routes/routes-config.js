const orgRouter = require('./organizations');
const eventRouter = require('./events');
const faqRouter = require('./faq');
const adminRouter = require('./admins');
const themeRouter = require('./themes');
const funnelRouter = require('./funnels');
const evalRouter = require('./evals');
const recoRouter = require('./recos');

const setupRoutes = (app) => {
  app.use('/emi/organizations', orgRouter);
  app.use('/emi/events', eventRouter);
  app.use('/emi/faq', faqRouter);
  app.use('/emi/admins', adminRouter);
  app.use('/emi/themes', themeRouter);
  app.use('/emi/funnels', funnelRouter);
  app.use('/emi/evals', evalRouter);
  app.use('/emi/recommandations', recoRouter);
};

module.exports = {
  setupRoutes,
};
