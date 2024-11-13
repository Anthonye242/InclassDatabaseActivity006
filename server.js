const express = require('express');
const { MongoClient } = require('mongodb');

// MongoDB URI
const uri = "mongodb+srv://anthonyeccleston:Aajden1156@csc350.70urd.mongodb.net/?retryWrites=true&w=majority&appName=CSC350";
const client = new MongoClient(uri);

const app = express();
app.use(express.json());  // Middleware to parse JSON requests

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Art Gallery!');
});

// Connect to MongoDB
let db;
client.connect()
  .then(() => {
    db = client.db("artgallery");
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// POST route to add a painting
app.post('/paintings', async (req, res) => {
  try {
    const { title, artist, year, medium } = req.body;
    const newPainting = { title, artist, year, medium };
    const result = await db.collection('paintings').insertOne(newPainting);
    res.status(201).send(`Painting added with ID: ${result.insertedId}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET route to fetch all paintings
app.get('/paintings', async (req, res) => {
  try {
    const paintings = await db.collection('paintings').find().toArray();
    res.status(200).json(paintings);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT route to update a painting
app.put('/paintings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, year, medium } = req.body;
    const updatedPainting = { title, artist, year, medium };
    const result = await db.collection('paintings').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      { $set: updatedPainting }
    );
    res.status(200).send(result.matchedCount ? 'Painting updated' : 'Painting not found');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE route to remove a painting
app.delete('/paintings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('paintings').deleteOne({ _id: new require('mongodb').ObjectId(id) });
    res.status(200).send(result.deletedCount ? 'Painting deleted' : 'Painting not found');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
