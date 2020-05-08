import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../app';


chai.use(chatHttp);
const { expect } = chai;

const user = {
    username: 'antoha',
    password: 'my_pass'
}

let token = null
before(function(done){
    chai.request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.data).to.include({
                user_id: 1,
                username: user.username
            });
            expect(res.body.data).to.have.keys('token', 'user_id', 'username')
            token = res.token;
            done();
        });
});

describe('Testing the user endpoints:', () => {
    it('It should not signup a user without enough data', (done) => {
        const user = {
            password: 'my_pass'
        };
        chai.request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
    
    it('It should logout', function(done){
        chai.request(app)
            .post('/api/user/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            })
    });

    it('It should not logout with blacklisted token', function(done){
        chai.request(app)
            .post('/api/user/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    });
  
    // it('It should get a particular book', (done) => {
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