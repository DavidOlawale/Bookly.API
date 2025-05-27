const logger = (req, res, next) => {
  console.log(`A ${req.method} request came from ${req.url}`);
  next();
};

module.exports = logger;