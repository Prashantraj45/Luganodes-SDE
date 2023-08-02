// authMiddleware.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/api/login'); // Redirect to the login page if not authenticated
    }
  };
  
  module.exports = {isAuthenticated};
  