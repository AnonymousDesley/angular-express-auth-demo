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


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = usersDb.find((u) => u.email === email && u.password === password);

  // If no matching user record is found, authentication fails
  if (!user) {
    // Return a 401 Unauthorized HTTP status
    return res.status(401).json({ message: 'Invalid email or password!' });
  }

  // Generate a signed JWT token containing non-sensitive payload data
  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email }, // Token payload
    JWT_SECRET,                                                 // Secret signing key
    { expiresIn: '1h' }                                         // Token expiration duration
  );

  // Respond with a 200 OK status, returning the JWT token and basic user info
  return res.json({
    message: 'Login successful!',
    token: token,
    user: { id: user.id, fullName: user.fullName, email: user.email }
  });
});

// Tell the Express application to listen on port 3000
app.listen(3000, () => {
  // Print a message to console indicating backend is running
  console.log('Fakebook Backend active at http://localhost:3000');
});