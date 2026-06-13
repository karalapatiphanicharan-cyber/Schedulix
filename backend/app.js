const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const simulationRoutes = require('./routes/simulationRoutes');
app.use('/api', simulationRoutes);

app.get('/', (req, res) => {
  res.json({
    status: "running",
    project: "Schedulix"
  });
});

module.exports = app;
