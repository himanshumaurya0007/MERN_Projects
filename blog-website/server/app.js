const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const {errorHandler} = require('./middlewares/errorHandler');
const cors = require('cors');
const morgan = require('morgan');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/blogs", blogRoutes);

app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Not Found! - ${req.originalUrl}`));
});

module.exports = app;