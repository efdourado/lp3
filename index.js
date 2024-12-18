const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/db'); // conexão bd

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// rotas (28)
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => console.log('servidor iniciado (3000)'));