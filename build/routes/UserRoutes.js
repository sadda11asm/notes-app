"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var router = (0, _express.Router)(); // router.get('/:id', isAuth.checkToken,  UserController.getUser); TODO: implement later

router.post('/signup', _UserController["default"].signUp);
router.post('/logout', _isAuth["default"].checkToken, _UserController["default"].logOut);
router.post('/login', _UserController["default"].logIn);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UserRoutes.js.map