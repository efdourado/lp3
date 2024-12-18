const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://eduardo61772:jIqrrkpKT5TwtZUm@cluster0.dvl2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err.message));

module.exports = mongoose;