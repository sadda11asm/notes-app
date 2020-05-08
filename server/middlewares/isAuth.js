require('dotenv').config();
const redis = require('redis')
let jwt = require('jsonwebtoken');

function checkToken (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        // console.log(err)
        return res.status(302).json({
          status: 302,
          success: false,
          message: 'Token is not valid'
        });
      } else {
        try {
          checkCache(token, (err, val) => {
            // console.log(val)
            if (err) {
              return res.status(500).json({
                status: 500,
                success: false,
                message: 'Server error!'
              });
            } else if (val != null) {
              return res.status(400).json({
                status: 400,
                success: false,
                message: 'Token is outdated!'
              });
            } 
            req.decoded = decoded;
            req.token = token
            return next();
          })
        } catch(error) {
          console.log(error)
          return res.status(500).json({
            status: 500,
            success: false,
            message: 'Server error'
          });
        }

      }
    });
  } else {
    console.log("ERRORRRR")
    return res.status(302).json({
      status: 302,
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

function checkCache(token, callback) {
  // check if token in redis cache
  try {
    const port_redis = process.env.PORT || 6379;
    const redis_client = redis.createClient(port_redis);
    redis_client.get(token, (err, val) => {
      console.log(val)
      callback(err, val)
    })
  } catch (error) {
    console.log(error)
    callback(true)
  }
}

module.exports = {
  checkToken: checkToken
}