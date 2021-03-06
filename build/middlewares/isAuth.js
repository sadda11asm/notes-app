"use strict";

require('dotenv').config();

var redis = require('redis');

var jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(302).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        try {
          checkCache(token, function (err, val) {
            // console.log(val)
            if (err) {
              return res.status(500).json({
                success: false,
                message: 'Server error!'
              });
            } else if (val != null) {
              return res.status(400).json({
                success: false,
                message: 'Token is outdated!'
              });
            }

            req.decoded = decoded;
            req.token = token;
            return next();
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: 'Server error'
          });
        }
      }
    });
  } else {
    return res.status(302).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
}

;

function checkCache(token, callback) {
  // check if token in redis cache
  try {
    var port_redis = process.env.PORT || 6379;
    var redis_client = redis.createClient(port_redis);
    redis_client.get(token, function (err, val) {
      console.log(val);
      callback(err, val);
    });
  } catch (error) {
    console.log(error);
    callback(true);
  }
}

module.exports = {
  checkToken: checkToken
};
//# sourceMappingURL=isAuth.js.map