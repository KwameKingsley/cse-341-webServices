const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An error occurred. Please try again later.'
    });
};

module.exports = errorHandler;