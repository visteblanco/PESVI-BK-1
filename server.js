const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://badgertelecompro:Fm3z6fI5O6Vj3vha@cluster0.jpuqnku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

// Ruta para insertar datos
app.post('/api/action/insertOne', (req, res) => {
  const { collection, database, dataSource, document } = req.body;
  
  // Cambiar a la base de datos especificada
  const db = mongoose.connection.useDb(database);

  // Acceder a la colección y realizar la inserción
  db.collection(collection).insertOne(document, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Ruta para consultar datos
app.post('/api/action/find', (req, res) => {
  const { collection, database, dataSource, filter } = req.body;

  // Cambiar a la base de datos especificada
  const db = mongoose.connection.useDb(database);

  // Acceder a la colección y realizar la consulta
  db.collection(collection).find(filter).toArray((err, documents) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(documents);
  });
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
