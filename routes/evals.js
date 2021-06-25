const evalRouter = require('express').Router();
const Eval = require('../models/eval');

evalRouter.get('/:evalId/events/:eventId/answers', (req, res) => {

});

module.exports = evalRouter;