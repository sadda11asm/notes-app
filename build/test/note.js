"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _app = _interopRequireDefault(require("../../app"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var user = {
  username: 'antoha-2',
  password: 'my_pass-2'
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
var note = {
  title: "My Diary",
  text: "Should finish test challenge by May 6th"
};
describe('Testing the note endpoints:', function () {
  it('It should create a note for the user', function (done) {
    // console.log(token)
    _chai["default"].request(_app["default"]).post('/api/note/create').set('Accept', 'application/json').set('Authorization', "Bearer ".concat(token)).send(note).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        id: 1
      });
      expect(res.body.data).to.have.keys('id', 'text', 'title', 'user_id', 'updatedAt', 'createdAt');
      token = res.body.data.token;
      done();
    });
  });
  it('It should get all notes', function (done) {
    // console.log(token)
    _chai["default"].request(_app["default"]).get('/api/note').set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data).to.have.deep.keys('id', 'text', 'title', 'user_id', 'updatedAt', 'createdAt');
      expect(res.body.data).to.have.deep.property({
        '[0].title': note.title,
        '[0].text': note.text,
        '[0].id': 0
      });
      token = res.body.data.token;
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
  }); // it('It should get a particular book', (done) => {
  //   const bookId = 1;
  //   chai.request(app)
  //     .get(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       res.body.data.should.have.property('id');
  //       res.body.data.should.have.property('title');
  //       res.body.data.should.have.property('price');
  //       res.body.data.should.have.property('description');
  //       done();
  //     });
  // });
  // it('It should not get a particular book with invalid id', (done) => {
  //   const bookId = 8888;
  //   chai.request(app)
  //     .get(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       res.body.should.have.property('message')
  //                           .eql(`Cannot find book with the id ${bookId}`);
  //       done();
  //     });
  // });
  // it('It should not get a particular book with non-numeric id', (done) => {
  //   const bookId = 'aaa';
  //   chai.request(app)
  //     .get(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       res.body.should.have.property('message')
  //                           .eql('Please input a valid numeric value');
  //       done();
  //     });
  // });
  // it('It should update a book', (done) => {
  //   const bookId = 1;
  //   const updatedBook = {
  //     id: bookId,
  //     title: 'Updated Awesome book',
  //     price: '$10.99',
  //     description: 'We have updated the price'
  //   };
  //   chai.request(app)
  //     .put(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedBook)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       expect(res.body.data.id).equal(updatedBook.id);
  //       expect(res.body.data.title).equal(updatedBook.title);
  //       expect(res.body.data.price).equal(updatedBook.price);
  //       expect(res.body.data.description).equal(updatedBook.description);
  //       done();
  //     });
  // });
  // it('It should not update a book with invalid id', (done) => {
  //   const bookId = '9999';
  //   const updatedBook = {
  //     id: bookId,
  //     title: 'Updated Awesome book again',
  //     price: '$11.99',
  //     description: 'We have updated the price'
  //   };
  //   chai.request(app)
  //     .put(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedBook)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       res.body.should.have.property('message')
  //                           .eql(`Cannot find book with the id: ${bookId}`);
  //       done();
  //     });
  // });
  // it('It should not update a book with non-numeric id value', (done) => {
  //   const bookId = 'ggg';
  //   const updatedBook = {
  //     id: bookId,
  //     title: 'Updated Awesome book again',
  //     price: '$11.99',
  //     description: 'We have updated the price'
  //   };
  //   chai.request(app)
  //     .put(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .send(updatedBook)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       res.body.should.have.property('message')
  //                           .eql('Please input a valid numeric value');
  //       done();
  //     });
  // });
  // it('It should delete a book', (done) => {
  //   const bookId = 1;
  //   chai.request(app)
  //     .delete(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       expect(res.body.data).to.include({});
  //       done();
  //     });
  // });
  // it('It should not delete a book with invalid id', (done) => {
  //   const bookId = 777;
  //   chai.request(app)
  //     .delete(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       res.body.should.have.property('message')
  //                           .eql(`Book with the id ${bookId} cannot be found`);
  //       done();
  //     });
  // });
  // it('It should not delete a book with non-numeric id', (done) => {
  //   const bookId = 'bbb';
  //   chai.request(app)
  //     .delete(`/api/v1/books/${bookId}`)
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       res.body.should.have.property('message').eql('Please provide a numeric value');
  //       done();
  //     });
  // });
});
//# sourceMappingURL=note.js.map