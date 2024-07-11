const path = require('path');

const morgan = require('morgan');
const express = require('express');

const ApiError = require('./utils/ApiError');
const globalErrorHandle = require('./middlewares/globalErrorHandle');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can not find this route ${req.originalUrl}`, 400));
});

app.use(globalErrorHandle);

module.exports = app;
