require('dotenv').config();
const redis = require('redis')
let jwt = require('jsonwebtoken');

function checkToken (req, res, next) {
  // console.log(next)
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }


  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err)
        return res.json({
          success: false,
          status: 302,
          message: 'Token is not valid'
        });
      } else {
        try {
          checkCache(token, (err, val) => {
            // console.log()
            if (err) {
              return res.json({
                status: 500,
                message: 'Server error!'
              });
            } else if (val != null) {
              return res.json({
                status: 400,
                message: 'Token is outdated!'
              });
            }
            // console.log("Middleware!")
            // console.log(decoded)
            req.decoded = decoded;
            req.token = token
            return next();
          })
        } catch(error) {
          console.log(error)
          return res.json({
            success: false,
            status: 500,
            message: 'Server error'
          });
        }

      }
    });
  } else {
    return res.json({
      success: false,
      status: 302,
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