const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'fakebook-super-secret-key-2026';

app.use(cors())