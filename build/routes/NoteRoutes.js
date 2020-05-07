"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _NoteController = _interopRequireDefault(require("../controllers/NoteController"));

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _shareLink = _interopRequireDefault(require("../middlewares/shareLink"));

var router = (0, _express.Router)();
router.post('/create', _isAuth["default"].checkToken, _NoteController["default"].createNote);
router.put('/edit/:id', _isAuth["default"].checkToken, _NoteController["default"].editNote);
router["delete"]('/delete/:id', _isAuth["default"].checkToken, _NoteController["default"].deleteNote);
router.get('/', _isAuth["default"].checkToken, _NoteController["default"].getNotes);
router.get('/:unique_token', _shareLink["default"].checkToken, _NoteController["default"].getNote);
router.get('/share/:id', _isAuth["default"].checkToken, _NoteController["default"].createLink);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=NoteRoutes.js.map