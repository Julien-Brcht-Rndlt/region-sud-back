const setHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', 'bytes : 0-9/*');

  next();
};

module.exports = setHeaders;
