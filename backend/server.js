const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'fakebook-super-secret-key-2026';

app.use(cors())
app.use(express.json());

const usersDb = []

app.post('/api/signup', (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
  }

  const existingUser = usersDb.find((user) => user.email === email);