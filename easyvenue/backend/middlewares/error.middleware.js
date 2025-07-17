const { StatusCodes } = require('http-status-codes');

// Handle 404 Not Found
const notFound = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        error: `Not Found: ${req.originalUrl}`,
    });
};

// General error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Something went wrong',
        details: err.message || 'Internal Server Error',
    });
};

module.exports = { notFound, errorHandler };
