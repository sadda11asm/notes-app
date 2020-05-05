const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
import userRoutes from './server/routes/UserRoutes';
import noteRoutes from './server/routes/NoteRoutes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;