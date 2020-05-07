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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require('dotenv').config();

var expiration_time = 86400;

require('dotenv').config();

var NoteService = /*#__PURE__*/function () {
  function NoteService() {
    (0, _classCallCheck2["default"])(this, NoteService);
  }

  (0, _createClass2["default"])(NoteService, null, [{
    key: "createNote",
    value: function () {
      var _createNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(new_note, next) {
        var user, db_note;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: new_note.username
                  }
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 7;
                  break;
                }

                next(new Error("Corrupted token and username"), false);
                return _context.abrupt("return");

              case 7:
                new_note.user_id = user.user_id;
                _context.next = 10;
                return _models["default"].Note.create(new_note);

              case 10:
                db_note = _context.sent;
                next(null, false, db_note);
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                next(_context.t0, false);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function createNote(_x, _x2) {
        return _createNote.apply(this, arguments);
      }

      return createNote;
    }()
  }, {
    key: "getNotes",
    value: function () {
      var _getNotes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(username, next) {
        var user, notes;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 7;
                  break;
                }

                next(new Error("Corrupted token and username"), false);
                return _context2.abrupt("return");

              case 7:
                _context2.next = 9;
                return _models["default"].Note.findAll({
                  where: {
                    user_id: user.user_id
                  }
                });

              case 9:
                notes = _context2.sent;
                next(null, false, notes);
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                next(_context2.t0, false);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function getNotes(_x3, _x4) {
        return _getNotes.apply(this, arguments);
      }

      return getNotes;
    }()
  }, {
    key: "getNote",
    value: function () {
      var _getNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(note_id, next) {
        var note;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].Note.findOne({
                  where: {
                    id: note_id
                  }
                });

              case 3:
                note = _context3.sent;

                if (note) {
                  _context3.next = 7;
                  break;
                }

                next(new Error("No such file!"), false);
                return _context3.abrupt("return");

              case 7:
                next(null, false, note);
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

      function getNote(_x5, _x6) {
        return _getNote.apply(this, arguments);
      }

      return getNote;
    }()
  }, {
    key: "createLink",
    value: function () {
      var _createLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, next) {
        var username, host, url, id, user, note, sharing_token, link;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                username = req.decoded.username;
                host = req.headers.host;
                url = req.baseUrl;
                id = req.params.id;
                _context4.prev = 4;
                _context4.next = 7;
                return _models["default"].User.findOne({
                  where: {
                    username: username
                  }
                });

              case 7:
                user = _context4.sent;

                if (user) {
                  _context4.next = 11;
                  break;
                }

                next(new Error("Corrupted token and username"), true);
                return _context4.abrupt("return");

              case 11:
                _context4.next = 13;
                return _models["default"].Note.findOne({
                  where: {
                    id: id
                  }
                });

              case 13:
                note = _context4.sent;

                if (note) {
                  _context4.next = 17;
                  break;
                }

                next(new Error("No such note with the given id!"), true);
                return _context4.abrupt("return");

              case 17:
                if (!(note.user_id != user.user_id)) {
                  _context4.next = 20;
                  break;
                }

                next(new Error("You do not have rights to share this note!"), true);
                return _context4.abrupt("return");

              case 20:
                sharing_token = _jsonwebtoken["default"].sign({
                  note_id: id
                }, process.env.JWT_SHARING_SECRET);
                console.log(sharing_token);
                link = "http://".concat(host).concat(url, "/").concat(sharing_token);
                next(null, false, link);
                _context4.next = 30;
                break;

              case 26:
                _context4.prev = 26;
                _context4.t0 = _context4["catch"](4);
                console.log(_context4.t0);
                next(_context4.t0, false);

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 26]]);
      }));

      function createLink(_x7, _x8) {
        return _createLink.apply(this, arguments);
      }

      return createLink;
    }()
  }, {
    key: "editNote",
    value: function () {
      var _editNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(username, id, new_note, next) {
        var user, note;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context5.sent;

                if (user) {
                  _context5.next = 7;
                  break;
                }

                next(new Error("Corrupted token and username"), true);
                return _context5.abrupt("return");

              case 7:
                _context5.next = 9;
                return _models["default"].Note.findOne({
                  where: {
                    id: id
                  }
                });

              case 9:
                note = _context5.sent;

                if (note) {
                  _context5.next = 13;
                  break;
                }

                next(new Error("No such note with the given id!"), true);
                return _context5.abrupt("return");

              case 13:
                if (!(note.user_id != user.user_id)) {
                  _context5.next = 16;
                  break;
                }

                next(new Error("You do not have rights to edit this note!"), true);
                return _context5.abrupt("return");

              case 16:
                _context5.next = 18;
                return note.update({
                  title: new_note.title,
                  text: new_note.text
                });

              case 18:
                next(null, false, note);
                _context5.next = 25;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);
                next(_context5.t0, false);

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 21]]);
      }));

      function editNote(_x9, _x10, _x11, _x12) {
        return _editNote.apply(this, arguments);
      }

      return editNote;
    }()
  }, {
    key: "deleteNote",
    value: function () {
      var _deleteNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(username, id, next) {
        var user, note;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context6.sent;

                if (user) {
                  _context6.next = 7;
                  break;
                }

                next(new Error("Corrupted token and username"), true);
                return _context6.abrupt("return");

              case 7:
                _context6.next = 9;
                return _models["default"].Note.findOne({
                  where: {
                    id: id
                  }
                });

              case 9:
                note = _context6.sent;

                if (note) {
                  _context6.next = 13;
                  break;
                }

                next(new Error("No such note with the given id!"), true);
                return _context6.abrupt("return");

              case 13:
                if (!(note.user_id != user.user_id)) {
                  _context6.next = 16;
                  break;
                }

                next(new Error("You do not have rights to delete this note!"), true);
                return _context6.abrupt("return");

              case 16:
                _context6.next = 18;
                return note.destroy();

              case 18:
                next(null, false);
                _context6.next = 25;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);
                next(_context6.t0, false);

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 21]]);
      }));

      function deleteNote(_x13, _x14, _x15) {
        return _deleteNote.apply(this, arguments);
      }

      return deleteNote;
    }()
  }]);
  return NoteService;
}();

var _default = NoteService;
exports["default"] = _default;
//# sourceMappingURL=NoteService.js.map