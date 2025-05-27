const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};

module.exports = errorHandler;