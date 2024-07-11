const dotenv = require('dotenv');

const dbConnection = require('./config/database');
const app = require('./app');

dotenv.config({ path: 'config.env' });

dbConnection();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}`);
});

// handle rejections outside express
process.on('unhandledRejection', err => {
  console.error(`UnhandledRejection Error : ${err.name} \n ${err.message} `);
  server.close(() => {
    console.error('Shutting down...');
    process.exit(1);
  });
});
