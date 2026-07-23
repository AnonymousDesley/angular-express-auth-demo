const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'fakebook-super-secret-key-2026';
app.use(cors());
app.use(express.json());
const usersDb = [];

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
    id: Date.now(),
    fullName: fullName,
    email: email,
    password: password
  };
  usersDb.push(newUser);
  return res.status(201).json({ message: 'Welcome to Fakebook! Account created successfully.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = usersDb.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }
  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  return res.json({
    message: 'Login successful!',
    token: token,
    user: { id: user.id, fullName: user.fullName, email: user.email }
  });
});

app.listen(3000, () => {
  console.log('Fakebook Backend active at http://localhost:3000');
});