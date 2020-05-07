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

var _UserService = _interopRequireDefault(require("../services/UserService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var util = new _Utils["default"]();
var server_err = "Server Error";

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "logIn",
    value: function () {
      var _logIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!req.body.username || !req.body.password)) {
                  _context.next = 3;
                  break;
                }

                util.setError(400, 'Please provide complete details to login!');
                return _context.abrupt("return", util.send(res));

              case 3:
                user = req.body;
                _context.prev = 4;
                _context.next = 7;
                return _UserService["default"].logIn(user, function (err, is_oper, db_user) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Successfully logged in!', db_user);
                  }
                });

              case 7:
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](4);
                util.setError(500, server_err);

              case 12:
                return _context.abrupt("return", util.send(res));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 9]]);
      }));

      function logIn(_x, _x2) {
        return _logIn.apply(this, arguments);
      }

      return logIn;
    }()
  }, {
    key: "logOut",
    value: function () {
      var _logOut = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.body;
                console.log(req.decoded);
                _context2.next = 5;
                return _UserService["default"].logOut(req.token, req.decoded.username, function (err, is_oper) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, "Successfully logged out!");
                  }
                });

              case 5:
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                util.setError(500, server_err);

              case 11:
                return _context2.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function logOut(_x3, _x4) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }()
  }, {
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var new_user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!req.body.username || !req.body.password)) {
                  _context3.next = 3;
                  break;
                }

                util.setError(400, 'Please provide complete details');
                return _context3.abrupt("return", util.send(res));

              case 3:
                new_user = req.body;
                _context3.prev = 4;
                _context3.next = 7;
                return _UserService["default"].signUp(new_user, function (err, is_oper, db_user) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'User Created!', db_user);
                  }
                });

              case 7:
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](4);
                console.log(_context3.t0);
                util.setError(500, server_err);

              case 13:
                return _context3.abrupt("return", util.send(res));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 9]]);
      }));

      function signUp(_x5, _x6) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                console.log("getUser");

                if (Number(id)) {
                  _context4.next = 5;
                  break;
                }

                util.setError(400, 'Please input a valid numeric value');
                return _context4.abrupt("return", util.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _UserService["default"].getUser(id);

              case 8:
                user = _context4.sent;

                if (!user) {
                  util.setError(404, "Cannot find user with the id ".concat(id));
                } else {
                  util.setSuccess(200, 'Found user', user);
                }

                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](5);
                util.setError(500, server_err);

              case 15:
                return _context4.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 12]]);
      }));

      function getUser(_x7, _x8) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=UserController.js.map