const express = require('express');
const ApiError = require('./utils/ApiError');
const globalErrorHandle = require('./middlewares/globalErrorHandle');

const app = express();

app.use(express.json());

const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can not find this route ${req.originalUrl}`, 400));
});

app.use(globalErrorHandle);

module.exports = app;
