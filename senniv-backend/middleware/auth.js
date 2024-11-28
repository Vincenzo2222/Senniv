const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info
    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = auth;
