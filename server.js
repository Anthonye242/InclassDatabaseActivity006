const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas URI (replace with your own)
const uri = "mongodb+srv://anthonyeccleston:Aajden1156@csc350.70urd.mongodb.net/artGallery?retryWrites=true&w=majority";

// Connecting to MongoDB using Mongoose
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

const Painting = require('./models/Painting.js'); // Import Painting model

// Implement API Endpoints

// GET /api/paintings: Retrieve all the paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching paintings", error });
    }
});

// GET /api/paintings/:id: Retrieve a painting by ID
app.get('/api/paintings/:id', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (!painting) return res.status(404).json({ message: "Painting not found" });
        res.json(painting);
    } catch (error) {
        res.status(500).json({ message: "Error fetching painting", error });
    }
});

// PUT /api/paintings/:id: Update a painting by ID
app.put('/api/paintings/:id', async (req, res) => {
    try {
        const updatedPainting = await Painting.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!updatedPainting) {
            return res.status(404).json({message: "Painting not found"});
        }
        res.json(updatedPainting);
    } catch (error) {
        res.status(500).json({message: "Error Creating Painting:", error});
    }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start
});