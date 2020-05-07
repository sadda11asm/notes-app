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

var _NoteService = _interopRequireDefault(require("../services/NoteService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var util = new _Utils["default"]();
var server_err = "Server Error";

var NoteController = /*#__PURE__*/function () {
  function NoteController() {
    (0, _classCallCheck2["default"])(this, NoteController);
  }

  (0, _createClass2["default"])(NoteController, null, [{
    key: "getNotes",
    value: function () {
      var _getNotes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var username;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                username = req.decoded.username;
                _context.next = 4;
                return _NoteService["default"].getNotes(username, function (err, is_oper, db_user) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Notes are succesfully fetched!', db_user);
                  }
                });

              case 4:
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                util.setError(500, server_err);

              case 10:
                return _context.abrupt("return", util.send(res));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getNotes(_x, _x2) {
        return _getNotes.apply(this, arguments);
      }

      return getNotes;
    }()
  }, {
    key: "getNote",
    value: function () {
      var _getNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var note_id;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                note_id = req.decoded.note_id;
                _context2.next = 4;
                return _NoteService["default"].getNote(note_id, function (err, is_oper, db_note) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Note is succesfully fetched!', db_note);
                  }
                });

              case 4:
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                util.setError(500, server_err);

              case 10:
                return _context2.abrupt("return", util.send(res));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function getNote(_x3, _x4) {
        return _getNote.apply(this, arguments);
      }

      return getNote;
    }()
  }, {
    key: "createLink",
    value: function () {
      var _createLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _NoteService["default"].createLink(req, function (err, is_oper, link) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Note is succesfully fetched!', link);
                  }
                });

              case 3:
                _context3.next = 9;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                util.setError(500, server_err);

              case 9:
                return _context3.abrupt("return", util.send(res));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 5]]);
      }));

      function createLink(_x5, _x6) {
        return _createLink.apply(this, arguments);
      }

      return createLink;
    }()
  }, {
    key: "createNote",
    value: function () {
      var _createNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var new_note;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log(req);

                if (!(!req.body.title || !req.body.text)) {
                  _context4.next = 4;
                  break;
                }

                util.setError(400, 'Please provide complete details');
                return _context4.abrupt("return", util.send(res));

              case 4:
                new_note = req.body;
                new_note.username = req.decoded.username;
                _context4.prev = 6;
                _context4.next = 9;
                return _NoteService["default"].createNote(new_note, function (err, is_oper, db_user) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Note Created!', db_user);
                  }
                });

              case 9:
                _context4.next = 15;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](6);
                console.log(_context4.t0);
                util.setError(500, server_err);

              case 15:
                return _context4.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[6, 11]]);
      }));

      function createNote(_x7, _x8) {
        return _createNote.apply(this, arguments);
      }

      return createNote;
    }()
  }, {
    key: "editNote",
    value: function () {
      var _editNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var new_note, id, username;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                new_note = req.body;
                id = req.params.id;
                username = req.decoded.username;

                if (Number(id)) {
                  _context5.next = 6;
                  break;
                }

                util.setError(400, 'Please input a valid id of a note!');
                return _context5.abrupt("return", util.send(res));

              case 6:
                _context5.prev = 6;
                _context5.next = 9;
                return _NoteService["default"].editNote(username, id, new_note, function (err, is_oper, updated_note) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Note Updated!', updated_note);
                  }
                });

              case 9:
                _context5.next = 15;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](6);
                console.log(_context5.t0);
                util.setError(500, server_err);

              case 15:
                return _context5.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[6, 11]]);
      }));

      function editNote(_x9, _x10) {
        return _editNote.apply(this, arguments);
      }

      return editNote;
    }()
  }, {
    key: "deleteNote",
    value: function () {
      var _deleteNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, username;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.params.id;
                username = req.decoded.username;

                if (Number(id)) {
                  _context6.next = 5;
                  break;
                }

                util.setError(400, 'Please input a valid id of a note!');
                return _context6.abrupt("return", util.send(res));

              case 5:
                _context6.prev = 5;
                _context6.next = 8;
                return _NoteService["default"].deleteNote(username, id, function (err, is_oper) {
                  if (err) {
                    if (is_oper) {
                      util.setError(400, err.message);
                    } else {
                      util.setError(500, server_err);
                    }
                  } else {
                    util.setSuccess(201, 'Note Deleted!');
                  }
                });

              case 8:
                _context6.next = 14;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](5);
                console.log(_context6.t0);
                util.setError(500, server_err);

              case 14:
                return _context6.abrupt("return", util.send(res));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[5, 10]]);
      }));

      function deleteNote(_x11, _x12) {
        return _deleteNote.apply(this, arguments);
      }

      return deleteNote;
    }()
  }]);
  return NoteController;
}();

var _default = NoteController;
exports["default"] = _default;
//# sourceMappingURL=NoteController.js.map