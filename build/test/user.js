"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _app = _interopRequireDefault(require("../../app"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the user endpoints:', function () {
  it('It should signup a user', function (done) {
    var user = {
      username: 'antoha',
      password: 'my_pass'
    };

    _chai["default"].request(_app["default"]).post('/api/user/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        user_id: 1,
        username: user.username
      });
      expect(res.body.data).to.have.keys('token', 'user_id', 'username');
      done();
    });
  });
});
//# sourceMappingURL=user.js.map