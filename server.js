const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artgallery', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the painting schema
const paintingSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number,
    medium: String,
    image: String,
    description: String
});

const Painting = mongoose.model('Painting', paintingSchema);

// API to get all paintings
app.get('/paintings', async (req, res) => {
    const paintings = await Painting.find();
    res.json(paintings);
});

// API to update a painting
app.put('/paintings/:id', async (req, res) => {
    const updatedPainting = await Painting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPainting);
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
