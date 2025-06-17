
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, ip } = req;
    
    console.log(`[${timestamp}] ${method} ${url}`);    
    next();
};

module.exports = loggerMiddleware;
