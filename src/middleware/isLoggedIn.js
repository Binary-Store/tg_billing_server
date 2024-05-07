const isLoggedIn = (req, res, next) => {
  if (!req.user) throw new Error('UNAUTHORIZED');
  next();
};

module.exports = isLoggedIn;
