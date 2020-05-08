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
            token = res.body.data.token;
            done();
        });
});

describe('Testing the user endpoints:', () => {
    it('It should not signup a user without enough data', (done) => {
        const user = {
            password: 'my_pass'
        };
        // console.log(token)
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
        // console.log(token)
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
        // console.log(token)
        chai.request(app)
            .post('/api/user/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            })
    });
  
    it('It should login', function(done){
        // console.log(token)
        chai.request(app)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.have.keys('token', 'username')
                token = res.body.data.token;
                done();
            })
    });
    
  
  });