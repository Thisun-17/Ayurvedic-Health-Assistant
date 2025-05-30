const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  
  // Check if token exists in headers
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'temporarysecretkey123');
      
      // Add user from payload to request
      req.user = {
        id: decoded.id,
        // Add more user properties as needed
      };
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

module.exports = { protect };