module.exports = {
  port: process.env.PORT || 3000,
  delay: 500,
  enableCors: true,
  mongoDBConnectionString: process.env.MONGODB_CONNECTION_STRING,
};
