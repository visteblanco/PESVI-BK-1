const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://badgertelecompro:Fm3z6fI5O6Vj3vha@cluster0.jpuqnku.mongodb.net/<dbname>'; // Reemplaza <dbname> con el nombre de tu base de datos

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Esquema de ejemplo para MongoDB
const dataSchema = new mongoose.Schema({
  email: String,
  // Añade más campos según tu colección
});

const Data = mongoose.model('Data', dataSchema);

// Endpoint para obtener datos de una colección
app.post('/api/action/find', async (req, res) => {
  const { collection, database, dataSource, filter } = req.body;

  try {
    const query = Data.find(filter);
    const data = await query.exec();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Endpoint para insertar datos en una colección
app.post('/api/action/insertOne', async (req, res) => {
  const { collection, database, dataSource, document } = req.body;

  try {
    const newData = new Data(document);
    const result = await newData.save();
    res.json(result);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});

// Iniciar el servidor
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
