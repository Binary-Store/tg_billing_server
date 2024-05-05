const Service = require('./user.service');

exports.register = async (req, res, next) => {
  try {
    const user = await Service.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await Service.login(email, password);
    res.cookie('token', result.token, { maxAge: 1000 * 3600 * 24, httpOnly: true });
    res.cookie('user', JSON.stringify(result.user), { maxAge: 1000 * 3600 * 24 });
    res.status(200).json(result.user);
  } catch (error) {
    next(error);
  }
};
