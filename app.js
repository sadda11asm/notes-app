const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Container = require("typedi").Container;
import userRoutes from './server/routes/UserRoutes';
import noteRoutes from './server/routes/NoteRoutes';
import RedisInstance from './server/utils/RedisClient'

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Container.set("redis", new RedisInstance())



app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;