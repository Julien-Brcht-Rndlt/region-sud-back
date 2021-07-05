const orgRouter = require('./organizations');
const eventRouter = require('./events');
const faqRouter = require('./faq');
const adminRouter = require('./admins');
const themeRouter = require('./themes');
const funnelRouter = require('./funnels');
const evalRouter = require('./evals');

const setupRoutes = (app) => {
  app.use('/emi/organizations', orgRouter);
  app.use('/emi/events', eventRouter);
  app.use('/emi/faq', faqRouter);
  app.use('/emi/admins', adminRouter);
  app.use('/emi/themes', themeRouter);
  app.use('/emi/funnels', funnelRouter);
  app.use('/evals/1', evalRouter);
};

module.exports = {
  setupRoutes,
};
