require('dotenv').config();
let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  // console.log(next)
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || req.body.username != decoded.username) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        // console.log("Middleware!")
        // console.log(decoded)
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}