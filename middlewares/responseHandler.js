const path = require('path');
module.exports = function (req, res, next) {
  res.error = (err, status = 500, args = {}) => {
    res.status(status).json({result: 'error', error: err.message || err, ...args})
    //console.log(err)
  }

  res.success = (message, args = {}) => {
    res.status(200).json({result: 'success', message, ...args})
  }

  res.renderice = (endPoint, options = {}) => {
    const filePath = path.join(__dirname, '../views', endPoint);
    res.sendFile(filePath);
  }

  res.redirection = (endPoint = '/') => {
    res.redirect(endPoint)
  }
  next()
}