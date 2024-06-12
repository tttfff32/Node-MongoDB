const express = require('express');
const cors = require('cors');
const log4js = require('log4js');
require('dotenv').config();
require('./config');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const productRoutes = require('./routes/productRoutes');
const swaggerApp = require('./swagger'); // ייבוא קובץ swagger.js





const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'info';

// Middleware
app.use('/', swaggerApp);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
