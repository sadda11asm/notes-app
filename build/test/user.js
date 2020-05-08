"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _app = _interopRequireDefault(require("../../app"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var user = {
  username: 'antoha',
  password: 'my_pass'
};
var token = null;
before(function (done) {
  _chai["default"].request(_app["default"]).post('/api/user/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
    expect(res.status).to.equal(201);
    expect(res.body.data).to.include({
      user_id: 1,
      username: user.username
    });
    expect(res.body.data).to.have.keys('token', 'user_id', 'username');
    token = res.body.data.token;
    done();
  });
});
describe('Testing the user endpoints:', function () {
  it('It should not signup a user without enough data', function (done) {
    var user = {
      password: 'my_pass'
    }; // console.log(token)

    _chai["default"].request(_app["default"]).post('/api/user/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('It should logout', function (done) {
    // console.log(token)
    _chai["default"].request(_app["default"]).post('/api/user/logout').set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('It should not logout with blacklisted token', function (done) {
    // console.log(token)
    _chai["default"].request(_app["default"]).post('/api/user/logout').set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('It should login', function (done) {
    // console.log(token)
    _chai["default"].request(_app["default"]).post('/api/user/login').send(user).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.keys('token', 'username');
      token = res.body.data.token;
      done();
    });
  });
});
//# sourceMappingURL=user.js.map