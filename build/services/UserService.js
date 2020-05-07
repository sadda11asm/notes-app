"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var _crypto = require("crypto");

var _argon = _interopRequireDefault(require("argon2"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require('dotenv').config();

var redis = require('redis');

var expiration_time = 86400;

var UserService = /*#__PURE__*/function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(new_user, next) {
        var prev_user, salt, hashed_password, token, db_user, user_res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: new_user.username
                  }
                });

              case 3:
                prev_user = _context.sent;

                if (!prev_user) {
                  _context.next = 7;
                  break;
                }

                next(new Error("Choose another username"), true);
                return _context.abrupt("return");

              case 7:
                salt = (0, _crypto.randomBytes)(32);
                _context.next = 10;
                return _argon["default"].hash(new_user.password, {
                  salt: salt
                });

              case 10:
                hashed_password = _context.sent;
                new_user.password = hashed_password;
                new_user.salt = salt.toString();
                token = _jsonwebtoken["default"].sign({
                  username: new_user.username
                }, process.env.JWT_SECRET, {
                  expiresIn: '24h' // expires in 24 hours

                });
                _context.next = 16;
                return _models["default"].User.create(new_user);

              case 16:
                db_user = _context.sent;
                user_res = JSON.parse(JSON.stringify(db_user));
                user_res.token = token;
                Reflect.deleteProperty(user_res, 'password');
                Reflect.deleteProperty(user_res, 'salt');
                next(null, false, user_res);
                _context.next = 28;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                next(_context.t0, false);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 24]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "logIn",
    value: function () {
      var _logIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user, next) {
        var db_user, valid_password, token, user_res;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: user.username
                  }
                });

              case 3:
                db_user = _context2.sent;

                if (db_user) {
                  _context2.next = 7;
                  break;
                }

                next(Error("Incorrect username"), true);
                return _context2.abrupt("return");

              case 7:
                _context2.next = 9;
                return _argon["default"].verify(db_user.password, user.password);

              case 9:
                valid_password = _context2.sent;

                if (valid_password) {
                  token = _jsonwebtoken["default"].sign({
                    username: user.username
                  }, process.env.JWT_SECRET, {
                    expiresIn: '24h' // expires in 24 hours

                  });
                  user_res = JSON.parse(JSON.stringify(user));
                  user_res.token = token;
                  Reflect.deleteProperty(user_res, 'password');
                  next(null, false, user_res);
                } else {
                  next(Error("Incorrect password"), true);
                }

                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0.message);
                res(new Error(_context2.t0.message), false);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function logIn(_x3, _x4) {
        return _logIn.apply(this, arguments);
      }

      return logIn;
    }()
  }, {
    key: "logOut",
    value: function () {
      var _logOut = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token, username, next) {
        var port_redis, redis_client;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                port_redis = process.env.PORT || 6379;
                redis_client = redis.createClient(port_redis); // add to blacklist of tokens

                _context3.next = 5;
                return redis_client.set(token, username);

              case 5:
                _context3.next = 7;
                return redis_client.expire(token, expiration_time);

              case 7:
                // console.log(set)
                next();
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                next(_context3.t0, false);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function logOut(_x5, _x6, _x7) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }() // static async clean_cache(username, redis_client) {
    //     const end = Date.now()
    //     var d = Date.parse(end)
    //     const expiredTokens = await redis_client.zrangebyscore(`${username}-tokens`, `-inf`, d);
    //     expiredTokens.length >= 1 && expiredTokens.forEach(async token => {
    //         await redis.zrem(`${username}-tokens`, token)
    //     });
    // }
    //   static async getABook(id) {
    //     try {
    //       const theBook = await database.Book.findOne({
    //         where: { id: Number(id) }
    //       });
    //       return theBook;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }
    //   static async deleteBook(id) {
    //     try {
    //       const bookToDelete = await database.Book.findOne({ where: { id: Number(id) } });
    //       if (bookToDelete) {
    //         const deletedBook = await database.Book.destroy({
    //           where: { id: Number(id) }
    //         });
    //         return deletedBook;
    //       }
    //       return null;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }

  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=UserService.js.map