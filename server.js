const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://badgertelecompro:Fm3z6fI5O6Vj3vha@cluster0.jpuqnku.mongodb.net/<dbname>';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

// Define tus rutas y controladores aquí
// Ejemplo básico:
app.get('/api/data', (req, res) => {
  // Aquí puedes realizar consultas a MongoDB y devolver datos
  res.json({ message: 'Datos desde MongoDB' });
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
