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

  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email already exists!' });
  }

  const newUser = {
    id: Date.now(),      // Assign a unique ID using the current timestamp
    fullName: fullName, // Store user's full name
    email: email,       // Store user's email address
    password: password  // Store password (in real production, always hash with bcrypt!)
  };

    usersDb.push(newUser);