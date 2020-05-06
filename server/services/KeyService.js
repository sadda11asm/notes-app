var redis = require('redis');
var JWT = require('../utils/jwt');
var EXPIRATION_TIME = config.get('key_service:expires_seconds');
var sessionKey = require('../utils/sessionKey');

function KeyService() {
  this.client = redis.createClient(config.get('key_service:port'),
                                   config.get('key_service:host'));
  this.client.on('connect', function() {
    console.log('Redis connected.');
  });
  console.log('Connecting to Redis...');
}

// Retrieve a JWT user key
KeyService.prototype.get = function(sessionKey) {
  return this.client.getAsync(sessionKey);
};

// Generate and store a new JWT user key
KeyService.prototype.set = function(user, deviceId) {
  var userKey = uuid.v4();
  var issuedAt = new Date().getTime();
  var expiresAt = issuedAt + (EXPIRATION_TIME * 1000);

  var token = JWT.generate(user, deviceId, userKey, issuedAt, expiresAt);
  var key = sessionKey(user.id, deviceId, issuedAt);

  var setKey = this.client.setAsync(key, userKey);
  var setExpiration = setKey.then(this.client.expireAsync(key,
                                  EXPIRATION_TIME));
  var getToken = setExpiration.then(function() {
    return token;
  });

  return getToken;
};

// Manually remove a JWT user key
KeyService.prototype.delete = function(sessionKey) {
  return this.client.delAsync(sessionKey);
};

module.exports = new KeyService();