let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send('권한 미달입니다.');
  }
  next();
};

module.exports = { admin };
