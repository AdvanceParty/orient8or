const express = require('express');
const HTTP = require('http');

module.exports = staticFilePath => {
  const app = express();
  app.use(express.static(staticFilePath));
  return HTTP.createServer(app);
};
