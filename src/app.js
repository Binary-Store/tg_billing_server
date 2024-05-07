const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const Logger = require('./lib/logger');
const errorHandler = require('./utility/errorHandler');
const apiRoutes = require('./components/routes');
const parseUser = require('./middleware/parseUser');

const app = express();

app.use(morgan(':method :url Status : :status, Time taken: :response-time ms', {
  stream: {
    write: (message) => Logger.info(message),
  },
}));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(parseUser);

// Health check route to verify if the server is running or not
app.get('/health', (req, res) => {
  res.send('ok');
});

app.use('/docs', express.static('docs/api'));

app.use('/api', apiRoutes);

app.use(errorHandler);

module.exports = app;
